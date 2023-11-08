import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { SocketService } from './socket.service';




@NgModule({
  providers:[
    SocketService
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    LoadingComponent,
    
  ]
})
export class SharedModule { }
