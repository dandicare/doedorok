import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';

const DEFAULT_WEB_URL = 'http://10.10.150.243:3000';
const APP_SCHEME = 'app://';

function getWebUrl() {
  // Expo 환경변수(.env / app config)로 주입: EXPO_PUBLIC_WEB_URL
  const envUrl = process.env.EXPO_PUBLIC_WEB_URL;
  return envUrl && envUrl.trim().length > 0 ? envUrl : DEFAULT_WEB_URL;
}

function tryHandleAppLink(url: string) {
  if (!url.startsWith(APP_SCHEME)) return false;

  // 예: app://example
  const rest = url.slice(APP_SCHEME.length); // "example"
  const [rawRoute] = rest.split('?');
  const pathname = `/${(rawRoute || 'index').replace(/^\/+/, '')}`;
  router.push(pathname as any);
  return true;
}

function tryHandleWebMessage(data: unknown) {
  if (typeof data !== 'string') return false;

  try {
    const parsed = JSON.parse(data);
    if (parsed?.type !== 'NAVIGATE') return false;
    const screen = String(parsed?.screen ?? '').trim();
    if (!screen) return false;

    router.push(`/${screen}` as any);
    return true;
  } catch {
    return false;
  }
}

export default function AppRootWebViewScreen() {
  const webUrl = useMemo(() => getWebUrl(), []);
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(Boolean(navState.canGoBack));

    // iOS에서 onShouldStartLoadWithRequest가 항상 보장되지 않는 케이스 대비
    if (navState?.url && tryHandleAppLink(navState.url)) {
      webViewRef.current?.stopLoading();
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    });

    return () => sub.remove();
  }, [canGoBack]);

  const onShouldStartLoadWithRequest = useCallback(
    (req: any) => {
      const url: string | undefined = req?.url;
      if (!url) return true;

      // 웹에서 app://webview?... 로 네이티브 화면 전환 트리거
      if (tryHandleAppLink(url)) return false;

      // 같은 origin은 WebView 안에서 계속 탐색
      const isSameOrigin = url.startsWith(webUrl);
      if (isSameOrigin) return true;

      // 외부 링크는 시스템 브라우저로
      if (url.startsWith('http://') || url.startsWith('https://')) {
        WebBrowser.openBrowserAsync(url).catch(() => {});
        return false;
      }

      return true;
    },
    [webUrl],
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: webUrl }}
          originWhitelist={['*']}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          onMessage={(e) => {
            // 가장 안정적인 네이티브 화면 전환 트리거
            tryHandleWebMessage(e?.nativeEvent?.data);
          }}
          onNavigationStateChange={onNavigationStateChange}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onLoadStart={() => {
            setIsLoading(true);
            setError(null);
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={(e) => {
            setIsLoading(false);
            setError(e?.nativeEvent?.description ?? 'WebView 로딩 중 오류가 발생했습니다.');
          }}
        />

        {isLoading ? (
          <View pointerEvents="none" style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>웹을 불러오는 중…</Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorTitle}>WebView 로딩 실패</Text>
            <Text style={styles.errorBody}>{error}</Text>
            <Text style={styles.errorHint}>
              {`실기기(Expo Go)에서 로컬 개발 서버를 띄우는 경우, EXPO_PUBLIC_WEB_URL을 같은 Wi‑Fi의 IP로 설정하세요.\n예) http://192.168.0.12:3000`}
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  loadingText: {
    color: '#fff',
  },
  errorOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  errorTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  errorBody: {
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
  },
  errorHint: {
    color: '#fff',
    opacity: 0.75,
    fontSize: 12,
    lineHeight: 16,
  },
});

