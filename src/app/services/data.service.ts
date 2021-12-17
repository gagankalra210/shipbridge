import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  items: Item[] = [];

  constructor() {}

  addItemData(item: Item) {
    return new Observable((observer) => {
      this.items.push(item);
      observer.next('success');
    });
  }

  getItems() {
    return new Observable((observer) => {
      observer.next(this.items);
    });
  }

  deleteItem(id: Guid) {
    return new Observable((observer) => {
      const index = this.items.findIndex((el) => el.id === id);
      this.items.splice(index, 1);
      observer.next(this.items);
    });
  }

  editItem(item: Item) {
    return new Observable((observer) => {
      const index = this.items.findIndex((el) => el.id === item.id);
      this.items[index] = item;
      observer.next('success');
    });
  }
}
