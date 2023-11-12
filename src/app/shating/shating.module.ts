import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShatingComponent } from './shating/shating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShatingMessageComponent } from './shating-message/shating-message.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ShatingLayoutComponent } from './shating-layout/shating-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { RoomLinkComponent } from './room-link/room-link.component';



@NgModule({
  declarations: [
    ShatingComponent,
    ShatingMessageComponent,
    ShatingLayoutComponent,
    RoomLinkComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule ,
    SharedModule,
    AppRoutingModule
    
  ],exports:[
    ShatingComponent,
    ShatingMessageComponent,
    ShatingLayoutComponent
  ]

})
export class ShatingModule { }
