import { DataService } from './../services/data.service';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../models/item.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
})
export class InventoryFormComponent implements OnInit {
  @Input() itemData?: Item;
  @Output() exitForm?: EventEmitter<{ exit: boolean }> = new EventEmitter();

  form: FormGroup;

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      quantity: new FormControl(null, { validators: [Validators.required] }),
    });

    if (this.itemData) {
      this.form.patchValue({
        name: this.itemData.name,
        price: this.itemData.price,
        description: this.itemData.description,
        quantity: this.itemData.quantity,
      });
    }
  }

  save() {
    if (this.form.valid) {
      if (this.itemData) {
        this.itemData.name = this.form.getRawValue().name;
        this.itemData.price = this.form.getRawValue().price;
        this.itemData.description = this.form.getRawValue().description;
        this.itemData.quantity = this.form.getRawValue().quantity;

        this.dataSvc.editItem(this.itemData).subscribe((data) => {
          if (data === 'success') {
            window.alert('Item data modified successfully');
            this.exitForm.emit({ exit: true });
          } else {
            window.alert('Error in saving data');
          }
        });
      } else {
        const item: Item = {
          id: Guid.create(),
          name: this.form.getRawValue().name,
          price: this.form.getRawValue().price,
          description: this.form.getRawValue().description,
          quantity: this.form.getRawValue().quantity,
        };

        this.dataSvc.addItemData(item).subscribe((data) => {
          if (data === 'success') {
            this.form.reset();
            window.alert('Item data saved successfully');
          } else {
            window.alert('Error in saving data');
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
