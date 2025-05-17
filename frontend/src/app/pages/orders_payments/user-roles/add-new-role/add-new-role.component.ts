import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderPaymentsService } from '../../service/order-payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.scss']
})
export class AddNewRoleComponent {
 roleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewRoleComponent>,
    private api: OrderPaymentsService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
   
  }

  ngOnInit(): void{
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
    if (this.editData) {
      this.roleForm.patchValue({
        roleName: this.editData.roleName,
    });
    }
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const formJson = {
        roleName: this.roleForm.value.roleName, 
      }; 

      if(!this.editData){
        this.api.addrole(formJson).subscribe({
          next: (response: any) => {
            Swal.fire("User role added Successfully")
            this.dialogRef.close();
          },
          error: (error: any) => {
            Swal.fire("Error while adding User Role")
          }
        })
      }else{
        this.api.updateRole(this.editData.roleId, formJson).subscribe({
          next: (response: any) => {
            Swal.fire("User Role updated Successfully")
            this.dialogRef.close();
          },
          error: (error: any) => {
            Swal.fire("Error while updating user role")
          }
        })
      }

      
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
