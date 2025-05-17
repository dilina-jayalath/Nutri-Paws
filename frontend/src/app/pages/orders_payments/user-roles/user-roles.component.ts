import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { OrderPaymentsService } from '../service/order-payments.service';
import Swal from 'sweetalert2';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent {
 constructor(private fb: FormBuilder,  public dialog: MatDialog, private router: Router, private api: OrderPaymentsService ) {}
  
  
    displayedColumns: string[] = ['id', 'role', 'action'];
    
    roles:any[] = [];
  
     @ViewChild('sidenav') sidenav!: MatSidenav;
      
        toggleSidenav() {
          this.sidenav.toggle();
        }

        ngOnInit(){
                  this.getAllroles();
                }
        
                getAllroles(){
                  this.api.getAllroles().subscribe((res: any) => {
                    this.roles = res;
                  })
                }
          
                onAddItem(){
                   this.dialog.open(AddNewRoleComponent, {
                           height: '600px',
                           width: '600px'
                         }).afterClosed().subscribe(result => {
                           this.getAllroles()
                         });
                }
            
                logout() {
                  localStorage.clear();
                  this.router.navigate(['/customer']);
                }
        
                editcategory(cate: any){
                  this.dialog.open(AddNewRoleComponent, {
                            height: '400px',
                            width: '800px',
                            data: cate
                          }).afterClosed().subscribe(result => {
                           this.getAllroles
                          });
                }
        
                deletecategory(cate: any){
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
        
                delete(cate: any){
                  this.api.deleteRole(cate.roleId).subscribe({
                    next: (res: any) => {
                      if (res.toLowerCase().includes('delete successfully')) {
                        Swal.fire("User Role Deleted Successfully");
                      }
                      
                    },
                    error: (err: any) => {
                      Swal.fire("Error Deleting User Role")
                    }
                  })
                }

                openCart(){
                  this.dialog.open(CartDialogComponent, {
                        height: '800px',
                        width: '800px',
                      });
                }

}
