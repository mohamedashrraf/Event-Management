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
  foundPhoto!: string;
  loading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private eventHttp: EventHttpService
  ) {
    console.log(this.url);
    this.activeId = this.activeRoute.snapshot.params['id'];

    this.foundPhoto = `http://localhost:4000/api/v1/event/photo/${this.activeId}`;
    console.log(this.foundPhoto);

  }

  ngOnInit() {

    this.eventHttp.getEventDetails(this.activeId).subscribe(
      (res) => {
        this.foundEvent = res.data;
        this.loading = false; // Set loading to false on success
        console.log(this.foundEvent);

      },
      (error) => {
        console.log(error);
        this.loading = false; // Set loading to false on error
          this.router.navigate(['/notfound']);
      }
    );

    // this.eventHttp.getEventPhoto(this.activeId).subscribe(
    //   (res) => {
    //     this.foundPhoto = res;
    //     console.log(this.foundPhoto);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );


  }
}
