import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GetTokenDataService {

  get tokenData(){
    const whoiam = localStorage.getItem('whoiam');
  const token = JSON.parse(whoiam!).token;

      return jwtDecode(token!) as User
  }
}
