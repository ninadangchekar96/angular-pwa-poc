import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-complaint-popup',
  templateUrl: './create-complaint-popup.component.html',
  styleUrls: ['./create-complaint-popup.component.scss']
})
export class CreateComplaintPopupComponent implements OnInit {

  constructor(
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
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
