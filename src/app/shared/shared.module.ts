import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { SocketService } from './socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextPipe } from './pipes/text.pipe';




@NgModule({
  providers:[
    SocketService
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    LoadingComponent,
    TextPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
    TextPipe
  ]
})
export class SharedModule { }
