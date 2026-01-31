export type NativeBridgeMessage =
  | {
      type: 'NAVIGATE';
      screen: string;
    }
  | {
      type: string;
      [key: string]: unknown;
    };

export function parseNativeBridgeMessage(data: unknown): NativeBridgeMessage | null {
  if (typeof data !== 'string') return null;

  try {
    return JSON.parse(data) as NativeBridgeMessage;
  } catch {
    return null;
  }
}

export function screenToPathname(screen: string) {
  const s = String(screen ?? '').trim();
  if (!s) return null;

  // 안전하게 라우트 세그먼트로만 허용 (예: dev, parent/morning-checkin)
  // - 각 세그먼트는 [a-zA-Z0-9_-]+ 만 허용
  // - '..' 같은 경로 탈출 방지
  if (s.includes('..')) return null;

  const parts = s.split('/').filter(Boolean);
  if (parts.length === 0) return null;
  if (!parts.every((p) => /^[a-zA-Z0-9_-]+$/.test(p))) return null;

  return `/${parts.join('/')}`;
}

