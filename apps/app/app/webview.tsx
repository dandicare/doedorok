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
import { useLocalSearchParams } from 'expo-router';

const DEFAULT_WEB_URL = 'http://10.10.150.243:3000';

function getBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_WEB_URL;
  return envUrl && envUrl.trim().length > 0 ? envUrl : DEFAULT_WEB_URL;
}

export default function GenericWebViewScreen() {
  const params = useLocalSearchParams<{ url?: string; path?: string }>();
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = useMemo(() => getBaseUrl().replace(/\/$/, ''), []);

  const initialUrl = useMemo(() => {
    if (params.url && params.url.trim().length > 0) return params.url;

    const rawPath = params.path ?? '/';
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    return `${baseUrl}${path}`;
  }, [baseUrl, params.path, params.url]);

  const onNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(Boolean(navState.canGoBack));
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

      const isSameOrigin = url.startsWith(baseUrl);
      if (isSameOrigin) return true;

      if (url.startsWith('http://') || url.startsWith('https://')) {
        WebBrowser.openBrowserAsync(url).catch(() => {});
        return false;
      }

      return true;
    },
    [baseUrl],
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          originWhitelist={['*']}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
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
  },
});

