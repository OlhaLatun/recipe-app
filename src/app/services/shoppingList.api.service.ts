import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://recipe-app-c2b4b-default-rtdb.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class ShoppingListAPIService {
  constructor(private http: HttpClient) {}

  getShoppingListIems() {
    return this.http.get(`${url}/shoppingList.json`);
  }

  postShoppingListItem(item: { name: string; amount: number }) {
    this.http.post(`${url}/shoppingList.json`, item).subscribe();
  }

  updateShoppingListItem(item) {
    const body = {
      [item.id]: { name: item.name, amount: item.amount },
    };
    this.http.patch(`${url}/shoppingList.json`, body).subscribe();
  }

  deleteShoppingListItem(id: string) {
    this.http.delete(`${url}/shoppingList/${id}.json`).subscribe();
  }

  clearShoppingList() {
    this.http.delete(`${url}/shoppingList.json`).subscribe();
  }
}
