import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComplaintPopupComponent } from '../create-complaint-popup/create-complaint-popup.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-complaint-table',
  templateUrl: './complaint-table.component.html',
  styleUrls: ['./complaint-table.component.scss']
})
export class ComplaintTableComponent implements OnInit {
  dataSource:any;
  displayedColumns: string[] = ['id', 'email', 'name', 'body'];

  constructor(
    private _dataService:DataService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this._dataService.getComplaintList().subscribe((data:any) =>{
      this.dataSource = data.slice(0, 10);
    })
  }

  addNewComplaint(){
    const dialogRef = this.dialog.open(CreateComplaintPopupComponent, {
      height:'50%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
