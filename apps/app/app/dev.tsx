import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function DevScreen() {
  return <WebViewScreen initialPath="/dev" enableBridge />;
}

