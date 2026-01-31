export type AfterMealCheckinRecord = {
  id: string;
  createdAt: number;
  // step 1
  mealAmount: string;
  mealTime: string;
  mealFood1: string;
  mealFood2: string;
  cautions: string[];
  // step 2
  medicine1: string;
  medicine2: string;
  // step 3 (optional)
  note?: string;
};

const STORAGE_KEY = "dandicare:afterMealCheckins:v1";
const LAST_ADDED_KEY = "dandicare:afterMealCheckins:lastAddedId:v1";

function safeParseArray(value: string | null): unknown[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function listAfterMealCheckins(): AfterMealCheckinRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  const arr = safeParseArray(raw);
  return arr.filter(Boolean) as AfterMealCheckinRecord[];
}

export function addAfterMealCheckin(record: AfterMealCheckinRecord) {
  if (typeof window === "undefined") return;
  const current = listAfterMealCheckins();
  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([record, ...current])
  );
}

export function markLastAddedAfterMealCheckinId(id: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LAST_ADDED_KEY, id);
}

export function consumeLastAddedAfterMealCheckinId(): string | null {
  if (typeof window === "undefined") return null;
  const id = window.sessionStorage.getItem(LAST_ADDED_KEY);
  if (id) window.sessionStorage.removeItem(LAST_ADDED_KEY);
  return id;
}

