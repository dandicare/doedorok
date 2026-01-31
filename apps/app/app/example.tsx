import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function ExampleScreen() {
  return <WebViewScreen initialPath="/example" enableBridge />;
}
