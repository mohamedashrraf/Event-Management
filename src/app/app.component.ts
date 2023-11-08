import { Component } from '@angular/core';
import { SocketService } from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Event Management';
  arrayOfNotifi!:any[]
  constructor(private socket: SocketService){
    
  }
  ngOnInit() {
    this.socket.arrayOfNotifi.subscribe((arr)=>{
      this.arrayOfNotifi = arr
    
    })
    
  }
  userTrackBy(i:number,event:any){
    return event._id
  }
  public removEvent(i:number){
    console.log(i)
    this.arrayOfNotifi.splice(i,1)
    this.socket.numNot.next(this.arrayOfNotifi.length)
  }
}
