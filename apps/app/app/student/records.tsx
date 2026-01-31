import React from 'react';

import { WebViewScreen } from '@/components/webview-screen';

export default function StudentRecordsScreen() {
    return <WebViewScreen initialPath="/student/records" enableBridge />;
}

