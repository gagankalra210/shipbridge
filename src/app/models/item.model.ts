import { Guid } from 'guid-typescript';

export interface Item {
  id: Guid;
  name: string;
  price: number;
  description: string;
  quantity: string;
}

// ng add @angular/material
