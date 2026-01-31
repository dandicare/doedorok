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

  // 안전하게 라우트 세그먼트로만 허용 (예: example, settings, profile-edit)
  if (!/^[a-zA-Z0-9_-]+$/.test(s)) return null;
  return `/${s}`;
}

