import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userInfo!: UserInfo;
  loading: boolean = false;
  profileImgChaged = true;
  imgSrc: string = '';
  whoiam!: Whoiam;

  constructor(private authService: AuthService, private httpClint: HttpClient) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
    this.loading = true;
    this.httpClint
      .get<{ data: { proPicPath: string } }>(
        'https://events-app-api-faar.onrender.com/api/v1/user',
        {
          headers: {
            Authorization: this.whoiam.token!,
          },
        }
      )
      .subscribe(
        (res) => {
          this.imgSrc = res.data.proPicPath;
          if (!this.imgSrc) this.profileImgChaged = false;
        },
        (err) => {}
      );
    this.loading = false;
  }

  async ngOnInit() {
    this.loading = true;
    const user = await this.authService.user();
    this.loading = false;
    this.userInfo = user!;
  }

  changePhoto(event: any) {
    const targetEl = event.target as HTMLElement;
    const clickEvent = new MouseEvent('click');
    targetEl.children.item(0)?.dispatchEvent(clickEvent);
  }
  sendNewPhoto(user: any) {
    const file = user.target.files[0];
    const formData = new FormData();
    formData.append('proPic', file);
    this.httpClint
      .patch('https://events-app-api-faar.onrender.com/api/v1/user/', formData)
      .subscribe((res) => {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.imgSrc = event.target.result! as string;
          this.profileImgChaged = true;
        };

        reader.readAsDataURL(file);
      });
  }
}
