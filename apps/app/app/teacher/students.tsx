import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function TeacherStudentsScreen() {
  return <WebViewScreen initialPath="/teacher/students" enableBridge />;
}

