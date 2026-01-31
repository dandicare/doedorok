import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function TeacherWriteRecordScreen() {
  return <WebViewScreen initialPath="/teacher/write-record" enableBridge />;
}

