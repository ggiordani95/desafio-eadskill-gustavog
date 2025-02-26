export class LocalStorageService<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getValue(): T[] {
    const savedItems = localStorage.getItem(this.storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  }

  saveItems(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
