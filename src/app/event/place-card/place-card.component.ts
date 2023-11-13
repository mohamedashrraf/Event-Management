import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/shared/interfaces/user-info';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent {
  userInfo!: UserInfo;
  @Input() place: any;
  // @Input() updatePlaces: any;
  @Output() updatePlaces = new EventEmitter();
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.userInfo = user;
      !user.isAuthenticated && this.authService.redirectToLogin();
    });
  }
  morText: boolean = true;
  showMoreText: string = 'show more';
  showMore() {
    this.morText = !this.morText;
    this.morText
      ? (this.showMoreText = 'show more')
      : (this.showMoreText = 'show less');
  }

  async handleARemovePlace(id: string) {
    // return;

    this.updatePlaces.emit(id);
  }
}
