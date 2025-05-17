import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { OrderPaymentsService } from '../service/order-payments.service';
import Swal from 'sweetalert2';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss'],
})
export class SystemUsersComponent {
  showSubOrders = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: OrderPaymentsService
  ) {}

  users: any[] = [];
  showPayments=false;

  displayedColumns: string[] = ['userName', 'email', 'role', 'actions'];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.getAllusers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error: any) => {
        Swal.fire('Error while getting users');
      },
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onAddItem() {
    this.dialog
      .open(AddNewUserComponent, {
        height: '600px',
        width: '600px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.getAllUsers();
      });
  }

  editUser(user: any) {
    this.dialog
      .open(AddNewUserComponent, {
        height: '600px',
        width: '600px',
        data: user,
      })
      .afterClosed()
      .subscribe((result) => {
        this.getAllUsers();
      });
  }

  deleteUser(userId: number) {
    const dialogRef1 = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '350px',
      data: {
        title: 'Delete User',
        message:
          'Are you sure you want to delete this User? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef1.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(userId);
      }
    });
  }

  delete(id: any) {
    this.api.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire('User deleted');
      },
      error: (err: any) => {
        Swal.fire('Error While deleteing');
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }
}
