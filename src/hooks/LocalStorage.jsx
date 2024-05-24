export const isBrowser = typeof window !== 'undefined';
const appName = 'uni_store';

export class LocalStorage {
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(`${appName}_${key}`);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(`${appName}_${key}`, JSON.stringify(value));
  }

  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(`${appName}_${key}`);
  }

  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}
