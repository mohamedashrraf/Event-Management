import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent {
@Input()place:any
morText: boolean=false;
showMoreText:string ="show more"
showMore(){
  this.morText=!this.morText
  this.morText?this.showMoreText="show less":this.showMoreText="show more"

}
}
