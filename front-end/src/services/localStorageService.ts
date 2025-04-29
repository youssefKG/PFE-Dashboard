class LocalStorageService {
  public static setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
