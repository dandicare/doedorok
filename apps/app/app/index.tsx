import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function AppRootWebViewScreen() {
  return <WebViewScreen initialPath="/" enableBridge />;
}
