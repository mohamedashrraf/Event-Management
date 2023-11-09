import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventHttpService } from '../services/event-http.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  url = location.pathname;
  activeId: string = '';
  foundEvent: any;
  foundPhoto: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private eventHttp: EventHttpService
  ) {
    console.log(this.url);
  }

  ngOnInit() {
    this.activeId = this.activeRoute.snapshot.params['id'];

    this.eventHttp.getEventDetails(this.activeId).subscribe(
      (res) => {
        this.foundEvent = res.data;
        console.log(this.foundEvent);
      },
      (error) => {
        console.log(error);
        if (error.status === 404) {
          this.router.navigate(['/notfound']);
        }
      }
    );

    this.eventHttp.getEventPhoto(this.activeId).subscribe(
      (res) => {
        this.foundPhoto = res;
        console.log(this.foundPhoto);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
