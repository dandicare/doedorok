import React from 'react';
import { WebViewScreen } from '@/components/webview-screen';

export default function ParentMorningCheckinScreen() {
    return <WebViewScreen initialPath="/parent/morning-checkin" enableBridge />;
}

