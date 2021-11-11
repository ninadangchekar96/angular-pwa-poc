import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-complaint-popup',
  templateUrl: './create-complaint-popup.component.html',
  styleUrls: ['./create-complaint-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComplaintPopupComponent implements OnInit {
  takePhoto: boolean = false;
  selectImage: boolean = false;
  complaintFormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateComplaintPopupComponent>
  ) {}

  ngOnInit(): void {
    // this.grabFrame();
    this.initializeComplaintForm();
  }

  closeDialog() {
    this.dialogRef.close(); // Grab elements, create settings, etc.
    this.closeFrame();
  }

  initializeComplaintForm() {
    this.complaintFormGroup = this._fb.group({
      employeeName: ['', Validators.required],
      complaintCategory: ['Complaint Category 1', Validators.required],
      complaintDescription: ['', Validators.required],
      complaintPhoto: ['', Validators.required],
    });
  }

  grabFrame() {
    // Grab elements, create settings, etc.
    var video: any = document.getElementById('video');
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.srcObject = '';
          // video.play();
        });
    }
  }

  closeFrame() {
    const video:any = document.querySelector('video');
    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;

    if(mediaStream){
      // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
      const tracks = mediaStream?.getTracks();

      // Tracks are returned as an array, so if you know you only have one, you can stop it with:
      tracks[0]?.stop();

      // Or stop all like so:
      tracks.forEach((track:any) => track?.stop());
    }
  }

  snapPhoto() {
    this.takePhoto = true;
    this.selectImage = false;
    this.grabFrame();
    this.complaintFormGroup.controls['complaintPhoto'].reset();
    // Elements for taking the snapshot
    var canvas:any = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video: any = document.getElementById('video');

    // Trigger photo take
    context.drawImage(video, 0, 0, 300, 300);
    this.closeFrame();
  }

  onImageSelection(ev: any) {
    this.selectImage = true;
    this.takePhoto = false;
    this.closeFrame();
    const previewImgContainer: any = document.getElementById('preview');
    let reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      previewImgContainer.src = event.target.result;
    });
    reader.readAsDataURL(ev.target.files[0]);
  }

  onSubmitComplaint() {
    console.log(this.complaintFormGroup);
    this.closeDialog();
  }
}
