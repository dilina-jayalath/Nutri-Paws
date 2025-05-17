import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../../inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent {

  materialForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,   public dialogRef: MatDialogRef<UpdateStockComponent>, private api: InventoryService, @Inject(MAT_DIALOG_DATA) public editData: any) {}

  ngOnInit() {
      // Initialize form
      this.materialForm = this.fb.group({
        itemName: ['', Validators.required],
        stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],  // Only numbers
      });

      if(this.editData){
        console.log("data", this.editData);
        
        this.setupEditData();
      }
  }

  setupEditData(){
    this.materialForm.patchValue({
      itemName: this.editData.itemName,
      stock: this.editData.stock,
    })
  }

  onSubmit(){
    if (this.materialForm.valid){
      const formJson = {
        itemName: this.materialForm.value.itemName,
        description: this.editData.description,
        stock: this.materialForm.value.stock,
        price: this.editData.price,
        //image: this.selectedFile ? this.selectedFile.name : null, // Only store filename
        emgUrl :this.editData.emgUrl
      };

      const jsonData = JSON.stringify(formJson);


      this.api.updateItem(this.editData.itemId, jsonData).subscribe({
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }



}
