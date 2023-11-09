import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated = false;
  numberNot!:number 
  arrayOfNotifi!:any[]
  constructor(
    private authService: AuthServiceService,
    private socket: SocketService
  ) {
     this.socket.on('new_event', (event: any) => {
      console.log(event);
      this.socket.numNot.next(this.numberNot+1)
      this.arrayOfNotifi.push(event)
      console.log(this.arrayOfNotifi)
      this.socket.arrayOfNotifi.next(this.arrayOfNotifi)
    });
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user.isAuthenticated;
    });
    this.socket.on("connect_error", (err:any) => {
      console.log(`connect_error due to ${err}`);
    });
  }
  
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.socket.numNot.subscribe((num)=>{
      this.numberNot = num
      
    })
    this.socket.arrayOfNotifi.subscribe((arr)=>{
      this.arrayOfNotifi = arr
    })
   
  }
}
