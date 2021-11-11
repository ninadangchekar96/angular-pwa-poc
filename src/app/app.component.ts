import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-example';

  constructor(updates:SwUpdate){
    if(updates.isEnabled){
      updates.versionUpdates.subscribe(event=>{
        updates.activateUpdate().then(()=>{
          alert("New update is avaialble");
          document.location.reload();
        })
      });
    }
  }

  refreshPage(){
    window.location.reload();
  }
}
