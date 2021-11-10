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
      this.dataSource = [];
      this.prepareTableData(data.slice(0,10));
    })
  }

  prepareTableData(data = []){
    const complaintCategory = ['Complaint Category 1', 'Complaint Category 2', 'Complaint Category 3', 'Complaint Category 4', 'Complaint Category 5', 'Complaint Category 6', 'Complaint Category 7', 'Complaint Category 8', 'Complaint Category 9', 'Complaint Category 10'];

    const complainantName= ['Jayne Kuhic', 'Nikita Garfield', 'Hayden Althea', 'Mallory Kunze', 'Preston_Hudson', 'Bob Alan', 'Rupert Bran', 'Christopher Hughes', 'Joe Smith', 'Bob Patty'];

    if(data.length > 0){
      data.forEach((c: object, i) => {
        const obj:any = {...c};
        obj.name = complainantName[i];
        obj.type = complaintCategory[i];
        this.dataSource.push({...obj});
      })
    }
  }

  addNewComplaint(){
    const dialogRef = this.dialog.open(CreateComplaintPopupComponent, {
      height:'100%',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
