import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-item-dialog',
  templateUrl: './add-new-item-dialog.component.html',
  styleUrls: ['./add-new-item-dialog.component.scss']
})
export class AddNewItemDialogComponent {

  materialForm!: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder, private http: HttpClient,   public dialogRef: MatDialogRef<AddNewItemDialogComponent>, private api: InventoryService, @Inject(MAT_DIALOG_DATA) public editData: any) {}

  ngOnInit() {
    // Initialize form
    this.materialForm = this.fb.group({
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      stock: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],  // Only numbers
      price: ['', [Validators.required, Validators.pattern("^[1-9]+(\.[0-9]{1,2})?$")]], // Only decimals
    });

    // Fetch categories from backend
    this.fetchCategories();
    if(this.editData){
      this.setupEditData();
    }
  }

  setupEditData(){
    this.materialForm.patchValue({
      itemName: this.editData.item.itemName,
      category: this.editData.categoryId,
      description: this.editData.item.description,
      stock: this.editData.item.stock,
      price: this.editData.item.price,
    })
  }

  fetchCategories() {
    this.api.getAllCategories().subscribe({
      next:(res: any) => {
        console.log('sucess',res);

        if (res && Array.isArray(res)) {
          this.categories = res.map(category => ({
            categoryId: category.categoryId,
            name: category.name
          }));
        }
        console.log(this.categories);

      },
      error:(err: any) => {
        console.log('err',err);
        Swal.fire("Error While Fethcing Categories")
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.materialForm.valid && this.selectedFile) {
      const formJson = {
        itemName: this.materialForm.value.itemName,
        categories: [{"categoryId":this.materialForm.value.category}],
        description: this.materialForm.value.description,
        stock: this.materialForm.value.stock,
        price: this.materialForm.value.price,
        //image: this.selectedFile ? this.selectedFile.name : null, // Only store filename
        emgUrl :'/assets/uploads/image1.jpg'
      };

      // Convert to JSON string
      const jsonData = JSON.stringify(formJson);

      if(!this.editData){
        this.api.uploadItem(jsonData).subscribe({
          next: (res: any) => {
            console.log('Success:', res);
            Swal.fire('Item Added Successfully');
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.log('Error:', err);
            Swal.fire('Error while adding item');
          },
        });
      }else{
        this.api.updateItem(this.editData.item.itemId, jsonData).subscribe({
          next: (res: any) => {
            console.log('Success:', res);
            Swal.fire('Item Updated Successfully');
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.log('Error:', err);
            Swal.fire('Error while updating item');
          }
        })
      }


    } else {
      Swal.fire('Please fill all required fields and select an image.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
