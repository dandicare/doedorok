import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Platform, StyleSheet, Text, View } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import { parseNativeBridgeMessage, screenToPathname } from '@/lib/native-bridge';
import { postMessageToWebView, registerWebView, unregisterWebView } from '@/lib/webview-registry';
import {
  buildUrl,
  getBaseUrl,
  isHttpUrl,
  isSameOrigin,
  openExternalUrl,
} from '@/lib/webview';

type Props = {
  /** baseUrl이 https://... 처럼 “웹 앱의 origin”이면, path로 최종 URL을 만들어요. */
  initialPath?: string;
  /** initialUrl을 직접 주면 baseUrl/path보다 우선합니다. */
  initialUrl?: string;
  /** 네이티브에서 다른 WebView로 메시지 전달이 필요할 때 쓰는 id */
  webViewId?: string;
  /** 웹 → 네이티브 화면 이동(postMessage) 허용 여부 */
  enableBridge?: boolean;
  /**
   * 로딩 오버레이 노출 정책.
   * - 'delayed'(기본): 250ms 이상 걸릴 때만 오버레이 표시(깜빡임 최소화)
   * - 'always': 로딩 시작 즉시 표시
   * - 'never': 오버레이 표시 안 함
   */
  loadingOverlay?: 'delayed' | 'always' | 'never';
};

export function WebViewScreen({
  initialPath,
  initialUrl,
  webViewId,
  enableBridge = false,
  loadingOverlay = 'never',
}: Props) {
  const baseUrl = useMemo(() => getBaseUrl(), []);
  const url = useMemo(() => {
    if (initialUrl && initialUrl.trim().length > 0) return initialUrl;
    return buildUrl(baseUrl, initialPath ?? '/');
  }, [baseUrl, initialPath, initialUrl]);

  const webViewRef = useRef<WebView>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(loadingOverlay === 'always');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!webViewId) return;
    registerWebView(webViewId, webViewRef);
    return () => unregisterWebView(webViewId);
  }, [webViewId]);

  const tryNavigateFromMessage = useCallback((data: unknown) => {
    if (!enableBridge) return false;

    const msg = parseNativeBridgeMessage(data);
    if (!msg) return false;

    // Web -> Native: 화면 닫기(뒤로가기)
    if ((msg as any).type === 'GO_BACK') {
      router.back();
      return true;
    }

    // Web -> Native: 다른 WebView(예: 피드)로 데이터 전달
    if ((msg as any).type === 'AFTER_MEAL_CHECKIN_ADDED') {
      // feed 스크린은 native에서 parent/feed로 고정 id 사용
      // 화면 전환(뒤로가기) 직후에 메시지가 도착해야 "추가 애니메이션"이 살아있어요.
      // (피드 WebView가 아직 화면에 보이기 전이면 애니메이션이 체감이 거의 없음)
      setTimeout(() => {
        postMessageToWebView('parent/feed', JSON.stringify(msg));
      }, 500);
      return true;
    }

    if ((msg as any).type !== 'NAVIGATE') return false;

    const screen = String((msg as any).screen ?? '').trim();
    const pathname = screenToPathname(screen);
    if (!pathname) return false;

    // 로그인 후 첫 진입인 feed는 "루트"처럼 동작해야 해서 back stack을 남기지 않아요.
    if (screen === 'parent/feed') {
      router.replace(pathname as any);
      return true;
    }

    router.push(pathname as any);
    return true;
  }, [enableBridge]);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      setCanGoBack(Boolean(navState.canGoBack));
    },
    [],
  );

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
      const nextUrl: string | undefined = req?.url;
      if (!nextUrl) return true;

      // same-origin은 WebView 내부에서 계속
      if (isSameOrigin(nextUrl, baseUrl)) return true;

      // 외부 링크는 시스템 브라우저로
      if (isHttpUrl(nextUrl)) {
        openExternalUrl(nextUrl);
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
          source={{ uri: url }}
          originWhitelist={['*']}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          // 확대/줌 관련(특히 Android)
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          onMessage={(e) => {
            // 가장 안정적인 네이티브 화면 전환 트리거
            tryNavigateFromMessage(e?.nativeEvent?.data);
          }}
          onNavigationStateChange={onNavigationStateChange}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onLoadStart={() => {
            setIsLoading(true);
            setError(null);

            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
            if (loadingOverlay === 'never') {
              setShowLoadingOverlay(false);
              return;
            }
            if (loadingOverlay === 'always') {
              setShowLoadingOverlay(true);
              return;
            }

            loadingTimerRef.current = setTimeout(() => {
              setShowLoadingOverlay(true);
            }, 250);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
            setShowLoadingOverlay(false);
          }}
          onError={(e) => {
            setIsLoading(false);
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
            setShowLoadingOverlay(false);
            setError(e?.nativeEvent?.description ?? 'WebView 로딩 중 오류가 발생했습니다.');
          }}
        />

        {isLoading && showLoadingOverlay ? (
          <View pointerEvents="none" style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
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

