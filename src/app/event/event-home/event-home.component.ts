import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventHttpService } from '../services/event-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent implements OnInit {
  @Input() events: any;
  description: string = '';
  posterPath: any;
  updatedAt: any;
  title: any;
  CreatedAt: any;
  URL: any;

  constructor(
    private authService: AuthService,
    private eventHttpService: EventHttpService,
    private router: Router
  ) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
    });
    this.events = [];
  }
  handleClick() {
    // Navigate to the target page when the card is clicked
    // this.router.navigate(['event/:id']);
  }
  ngOnInit(): void {
    this.eventHttpService.getEvents().subscribe(
      (res) => {
        this.events = res.data;
        console.log(this.events);
        console.log(res);
      },
      (error: any) => {
        console.error('Error fetching items', error);
      }
    );
  }
}
