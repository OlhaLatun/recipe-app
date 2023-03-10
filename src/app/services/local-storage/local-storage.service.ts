import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T = any>(key: string): T {
    return this.parseValue(localStorage.getItem(key));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }

  public parseValue(value: any): any {
    const parsed = JSON.parse(value);
    if (parsed) {
      return parsed;
    } else {
      return undefined;
    }
  }
}
