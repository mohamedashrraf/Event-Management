import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userInfo!: UserInfo;
  loading: boolean = true;
  profileImgChaged = true;
  imgSrc: string =
    '';
  constructor(private authService: AuthService, private httpClint: HttpClient) {
    this.authService.user.subscribe((user) => {
      this.loading = false;
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
      if (user.proPicPath) this.profileImgChaged = true;
    });
    const whoiam = localStorage.getItem('whoiam');
    const token = JSON.parse(whoiam!).token;
    const tokenData = jwtDecode(token!) as any;
    console.log(tokenData)
    this.httpClint.get<{data:{proPicPath:string}}>('https://events-app-api-faar.onrender.com/api/v1/user',{
      headers:{
        Authorization:token,
      }}).subscribe((res)=>{
        this.imgSrc = res.data.proPicPath;
        this.userInfo = res.data as UserInfo
        if(!this.imgSrc)this.profileImgChaged = false;
      
      },(err)=>{
        console.log(err)
      })
    
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
        console.log(res);
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.imgSrc = event.target.result! as string;
          console.log(this.imgSrc)
          this.profileImgChaged = true;
        };

        reader.readAsDataURL(file);
      });
  }
}
