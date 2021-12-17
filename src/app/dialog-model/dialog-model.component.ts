import { Item } from './../models/item.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-model',
  templateUrl: './dialog-model.component.html',
  styleUrls: ['./dialog-model.component.css'],
})
export class DialogModelComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  exit(event: any) {
    const exit = event.exit as boolean;
    if (exit) {
      this.close();
    }
  }
}
