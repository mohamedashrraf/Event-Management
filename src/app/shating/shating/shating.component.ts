import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shating',
  templateUrl: './shating.component.html',
  styleUrls: ['./shating.component.scss']
})
export class ShatingComponent {
eventId: string;
constructor(private activeRoute:ActivatedRoute){

  this.eventId = this.activeRoute.snapshot.params["id"]
}
}
