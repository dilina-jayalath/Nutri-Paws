import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddNewItemDialogComponent } from '../add-new-item-dialog/add-new-item-dialog.component';
import { InventoryService } from '../inventory.service';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import Swal from 'sweetalert2';

interface Item {
  imageUrl: string;
  label: string;
  icon: string;
  quantity: number;
  issued_qty: number;
}

interface Category {
  name: string;
  items: Item[];
  displayItems: Item[];
}

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss'],
})
export class ManageInventoryComponent {
  searchTerm: string = '';
  items: any[] = [];
  categories: any[] = [];
  displayedItems: any[] = [];
  initialLimit: number = 10;
  isExpanded: boolean = false;
  initialCatLimit: number = 7;
  isCatExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: InventoryService
  ) {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    // this.getAllItems();
    this.setItemCategories();
  }

  setItemCategories() {
    this.api.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
        console.log('Get item categories - ' + JSON.stringify(this.categories));

        this.categories.forEach((category) => {
          this.api.getItemsByCategory(category.categoryId).subscribe(
            (items: any) => {
              category.items = items;

              category.isExpanded = false;
              category.displayItems = items.slice(0, this.initialCatLimit);
              category.isExpanded = false;
            },
            (error: any) => {}
          );
        });
      },
      (error: any) => {}
    );
  }

  onAddItem() {}

  loadMoreItems(category: Category) {
    category.displayItems = category.items; // Show all items
  }

  editItem(item: any, category: any) {
    console.log('cate', category);

    this.dialog
      .open(AddNewItemDialogComponent, {
        height: '800px',
        width: '800px',
        data: {
          item: item,
          categoryId: category.categoryId,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.setItemCategories();
        if (result) {
          console.log('Dialog closed with result:', result);
        } else {
          console.log('Dialog closed without result');
        }
      });
  }

  deleteItem(item: any) {
    console.log('id', item);
    const dialogRef1 = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '350px',
      data: {
        title: 'Delete Item',
        message:
          'Are you sure you want to delete this Item? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef1.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item: any) {
    console.log('id', item);

    this.api.deleteItem(item.itemId).subscribe({
      next: (res: any) => {
        if (res?.message) {
          Swal.fire(res.message); // backend sends the success message
        } else {
          Swal.fire('Item Deleted');
        }
        this.setItemCategories();
      },
      error: (err: any) => {
        Swal.fire('Failed To delete item');
      },
    });
  }

  filterItems() {
    this.categories.forEach((category) => {
      if (this.searchTerm.trim() === '') {
        category.displayItems = category.items.slice(0, this.initialCatLimit); // Reset if empty search
      } else {
        category.displayItems = category.items.filter((item: Item) =>
          item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    });
  }
}
