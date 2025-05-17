import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { OrderPaymentsService } from '../service/order-payments.service';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import Swal from 'sweetalert2';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';

interface InHouseOrder {
  id: number;
  category: string;
}

@Component({
  selector: 'app-category-lsit',
  templateUrl: './category-lsit.component.html',
  styleUrls: ['./category-lsit.component.scss'],
})
export class CategoryLsitComponent {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: OrderPaymentsService
  ) {}

  displayedColumns: string[] = ['id', 'category', 'action'];
  showSubOrders = false;
  categories: any[] = [];
  showPayments = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.api.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  onAddItem() {
    this.dialog
      .open(AddNewCategoryComponent, {
        height: '600px',
        width: '600px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.getAllCategories();
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  editcategory(cate: any) {
    this.dialog
      .open(AddNewCategoryComponent, {
        height: '400px',
        width: '800px',
        data: cate,
      })
      .afterClosed()
      .subscribe((result) => {});
  }

  deletecategory(cate: any) {
    const dialogRef1 = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '350px',
      data: {
        title: 'Delete Category',
        message:
          'Are you sure you want to delete this Category? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef1.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(cate);
      }
    });
  }

  delete(cate: any) {
    this.api.deleteCate(cate.categoryId).subscribe({
      next: (res: any) => {
        if (res.toLowerCase().includes('delete successfully')) {
          Swal.fire('Category Deleted Successfully');
        }
      },
      error: (err: any) => {
        Swal.fire('Error Deleting Category');
      },
    });
  }

  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }
}
