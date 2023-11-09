import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent {
@Input()place:any
morText: boolean=true;
showMoreText:string ="show more"
showMore(){
  this.morText=!this.morText
  this.morText?this.showMoreText="show more":this.showMoreText="show less"

}
}
