import React from "react";

import { WebViewScreen } from "@/components/webview-screen";

export default function ParentFeedScreen() {
  return <WebViewScreen initialPath="/parent/feed" enableBridge />;
}

