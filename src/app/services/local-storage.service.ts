import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

  private parseValue<T = any>(value: any): T {
    try {
      return JSON.parse(value);
    } catch (e) {
      return undefined;
    }
  }

  public subscribeTo$(key: string, options: { meaningfulOnly?: boolean } = {}): Observable<any> {
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((event) => event.key === key),
      map((event) => this.parseValue(event.newValue)),
      filter((value) => (options.meaningfulOnly ? value : true)),
    );
  }
}
