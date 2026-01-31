import * as WebBrowser from 'expo-web-browser';

export const DEFAULT_WEB_URL = 'http://10.10.141.187:3000';

export function getBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_WEB_URL;
  return envUrl && envUrl.trim().length > 0 ? envUrl : DEFAULT_WEB_URL;
}

export function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/$/, '');
}

export function buildUrl(baseUrl: string, path: string) {
  const base = normalizeBaseUrl(baseUrl);
  if (!path) return base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function isHttpUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function isSameOrigin(url: string, baseUrl: string) {
  const base = normalizeBaseUrl(baseUrl);
  return url.startsWith(base);
}

export async function openExternalUrl(url: string) {
  try {
    await WebBrowser.openBrowserAsync(url);
  } catch {
    // ignore
  }
}

