import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-complaint-popup',
  templateUrl: './create-complaint-popup.component.html',
  styleUrls: ['./create-complaint-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComplaintPopupComponent implements OnInit {
  complaintFormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateComplaintPopupComponent>,
  ) { }

  ngOnInit(): void {
     this.initializeComplaintForm() 
  }

  closeDialog(){
    this.dialogRef.close();
  }

  initializeComplaintForm(){
    this.complaintFormGroup = this._fb.group({
      "employeeName": ['', Validators.required],
      "complaintCategory":['Complaint Category 1', Validators.required],
      "complaintDescription":['', Validators.required],
      "complaintPhoto":['', Validators.required],
    })
  }

  onImageSelection(ev:any){
    const previewImgContainer:any = document.getElementById('preview');
    let reader = new FileReader();
    reader.addEventListener('load', (event:any) => {
      previewImgContainer.src = event.target.result;
    });
    reader.readAsDataURL(ev.target.files[0]);
  }

  onSubmitComplaint(){
    console.log(this.complaintFormGroup);
    this.closeDialog();
  }
}
