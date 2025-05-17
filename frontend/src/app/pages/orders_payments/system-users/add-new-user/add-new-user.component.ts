import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/environments/custom-validators';
import { OrderPaymentsService } from '../../service/order-payments.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {

   signupForm!: FormGroup;
    hidePassword = true;
    hideConfirmPassword = true;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private api: OrderPaymentsService,
        private router: Router,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddNewUserComponent>,
         @Inject(MAT_DIALOG_DATA) public editData: any
      ) {
        this.signupForm = this.fb.group(
          {
            username: [
              '',
              [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern(/^[A-Za-z]+$/), // Only letters allowed
              ],
            ],
            email: ['', [Validators.required, Validators.email]],
            password: [
              '',
              [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(
                  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/
                ),
              ],
            ],
            confirmPassword: ['', [Validators.required]],
            role: ['', Validators.required],
          },
          {
            validator: CustomValidators.passwordMatchValidator(
              'password',
              'confirmPassword'
            ),
          }
        );
      }

      ngOnInit(){
        if(this.editData){
          this.signupForm.patchValue({
            username: this.editData.userName,
            email: this.editData.email,
            role: this.editData.userRolId.roleId,
            password: this.editData.password,
            confirmPassword: this.editData.password
          });
        }
      }

      togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
      }
    
      toggleConfirmPasswordVisibility(): void {
        this.hideConfirmPassword = !this.hideConfirmPassword;
      }

      onSignup(){
        if (this.signupForm.invalid) {
          this.signupForm.markAllAsTouched();
          console.warn('Form is invalid:', this.signupForm.errors);
          return;
        }

        const payloadUser = {
          userName: this.signupForm.value.username,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
          userRolId: { roleId: this.signupForm.value.role },
        };

        if(!this.editData){
          this.api.createUserLogin(payloadUser).subscribe({
            next: (response: any) => {
              Swal.fire("User Added Successfully");
              this.dialogRef.close();
            },
            error: (error: any) => {
              Swal.fire("Error While Adding User")
            }
          })
        }else{
          this.api.updateUser(this.editData.userId, payloadUser).subscribe({
            next: (response: any) => {
              Swal.fire("User Updatecd Successfully");
              this.dialogRef.close();
            },
            error: (error: any) => {
              Swal.fire("Error While Updating User")
            }
          })
        }
        
      }


}
