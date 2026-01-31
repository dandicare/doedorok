import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function StudentProfileScreen() {
  return <WebViewScreen initialPath="/student/profile" enableBridge />;
}

