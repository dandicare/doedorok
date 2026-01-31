import type { WebView } from "react-native-webview";
import type { RefObject } from "react";

type WebViewRef = RefObject<WebView | null>;

const registry = new Map<string, WebViewRef>();

export function registerWebView(id: string, ref: WebViewRef) {
  if (!id) return;
  registry.set(id, ref);
}

export function unregisterWebView(id: string) {
  if (!id) return;
  registry.delete(id);
}

export function postMessageToWebView(id: string, message: string) {
  const ref = registry.get(id);
  ref?.current?.postMessage(message);
}

