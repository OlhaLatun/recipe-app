import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

const url = 'https://recipe-app-c2b4b-default-rtdb.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class ShoppingListAPIService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getShoppingListIems() {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get(`${url}/shoppingList.json`, {
          params: new HttpParams().set('auth', user.token),
        });
      })
    );
  }

  postShoppingListItem(item: { name: string; amount: number }) {
    return this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.post(`${url}/shoppingList.json`, item, {
            params: new HttpParams().set('auth', user.token),
          });
        })
      )
      .subscribe();
  }

  updateShoppingListItem(item) {
    const body = {
      [item.id]: { name: item.name, amount: item.amount },
    };
    return this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.patch(`${url}/shoppingList.json`, body, {
            params: new HttpParams().set('auth', user.token),
          });
        })
      )
      .subscribe();
  }

  deleteShoppingListItem(id: string) {
    return this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.delete(`${url}/shoppingList/${id}.json`, {
            params: new HttpParams().set('auth', user.token),
          });
        })
      )
      .subscribe();
  }

  clearShoppingList() {
    return this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.delete(`${url}/shoppingList.json`, {
            params: new HttpParams().set('auth', user.token),
          });
        })
      )
      .subscribe();
  }
}
