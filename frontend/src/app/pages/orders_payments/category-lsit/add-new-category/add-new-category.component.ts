import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderPaymentsService } from '../../service/order-payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewCategoryComponent>,
    private api: OrderPaymentsService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {

  }

  ngOnInit(): void{
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
    if (this.editData) {
      this.categoryForm.patchValue({
        categoryName: this.editData.name,
    });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formJson = {
        name: this.categoryForm.value.categoryName,
      };

      if(!this.editData){
        this.api.addCategory(formJson).subscribe({
          next: (response: any) => {
            Swal.fire("Category added Successfully")
          },
          error: (error: any) => {
            Swal.fire("Error while adding category")
          }
        })
      }else{
        this.api.updateCategory(this.editData.categoryId, formJson).subscribe({
          next: (response: any) => {
            Swal.fire("Category updated Successfully")
          },
          error: (error: any) => {
            Swal.fire("Error while updating category")
          }
        })
      }


    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
