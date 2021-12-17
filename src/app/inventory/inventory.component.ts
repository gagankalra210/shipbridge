import { DialogModelComponent } from './../dialog-model/dialog-model.component';
import { Item } from './../models/item.model';
import { DataService } from './../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  displayedColumns = ['name', 'price', 'quantity', 'description', 'actions'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator, { static: true }) tablePaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) tableSort: MatSort;

  constructor(private dataSvc: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSvc.getItems().subscribe((data) => {
      if (data) {
        const dataSource = data as Item[];
        this.bindTableData(dataSource);
      }
    });
  }

  bindTableData(dataSource: Item[]) {
    this.dataSource = new MatTableDataSource<Item>(dataSource);
    this.dataSource.paginator = this.tablePaginator;
    this.dataSource.sort = this.tableSort;
  }

  deleteItem(element: Item) {
    this.dataSvc.deleteItem(element.id).subscribe((data) => {
      if (data) {
        const dataSource = data as Item[];
        this.bindTableData(dataSource);
      }
    });
  }

  editItem(element: Item) {
    this.dialog.open(DialogModelComponent, {
      height: '575px',
      width: 'auto',
      data: element,
    });
  }
}
