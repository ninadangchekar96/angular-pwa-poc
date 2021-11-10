import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    // Grab elements, create settings, etc.
    var video:any = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
      }
     this.initializeComplaintForm() 
  }

  closeDialog(){
    this.dialogRef.close();
  }

  initializeComplaintForm(){
    this.complaintFormGroup = this._fb.group({
      "employeeName": ['', [Validators.required, Validators.email]],
      "complaintCategory":['Complaint Category 1', Validators.required],
      "complaintDescription":['', Validators.required],
      "complaintPhoto":[''],
    })
  }

  onSubmitComplaint(){
    console.log(this.complaintFormGroup);
    this.closeDialog();
  }
}
