import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss']
})
export class AboutsComponent implements OnInit {
  user!: User
  constructor(private router: Router) {
    const whoiam = localStorage.getItem("whoiam")
    if (!whoiam)
      this.router.navigate(["/login"]);
    else
      this.user = JSON.parse(whoiam);
  }
  ngOnInit(): void {
  }

}

