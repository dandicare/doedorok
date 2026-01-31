import React from "react";

import { WebViewScreen } from "@/components/webview-screen";

export default function ParentFeedScreen() {
  return <WebViewScreen webViewId="parent/feed" initialPath="/parent/feed" enableBridge />;
}

