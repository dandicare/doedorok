export type NativeBridgeMessage =
  | {
      type: "NAVIGATE";
      screen: string;
    }
  | {
      type: string;
      [key: string]: unknown;
    };

export function isInReactNativeWebView() {
  return typeof window !== "undefined" && Boolean((window as any).ReactNativeWebView);
}

export function postToNative(message: NativeBridgeMessage) {
  if (!isInReactNativeWebView()) return false;
  try {
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
    return true;
  } catch {
    return false;
  }
}

export function navigateNative(screen: string) {
  return postToNative({ type: "NAVIGATE", screen });
}

