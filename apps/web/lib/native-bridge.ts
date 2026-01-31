export type NativeBridgeMessage =
  | {
      type: "NAVIGATE";
      screen: string;
    }
  | {
      type: "GO_BACK";
    }
  | {
      type: "AFTER_MEAL_CHECKIN_ADDED";
      record: unknown;
    }
  | {
      type: string;
      [key: string]: unknown;
    };

type ReactNativeWebViewHandle = {
  postMessage: (message: string) => void;
};

function getReactNativeWebView(): ReactNativeWebViewHandle | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { ReactNativeWebView?: ReactNativeWebViewHandle };
  return w.ReactNativeWebView ?? null;
}

export function isInReactNativeWebView() {
  return Boolean(getReactNativeWebView());
}

export function postToNative(message: NativeBridgeMessage) {
  if (!isInReactNativeWebView()) return false;
  try {
    const rnwv = getReactNativeWebView();
    if (!rnwv) return false;
    rnwv.postMessage(JSON.stringify(message));
    return true;
  } catch {
    return false;
  }
}

export function navigateNative(screen: string) {
  return postToNative({ type: "NAVIGATE", screen });
}

export function goBackNative() {
  return postToNative({ type: "GO_BACK" });
}
