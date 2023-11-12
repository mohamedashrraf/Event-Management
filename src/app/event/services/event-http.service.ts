import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHttpService {

  constructor(private http: HttpClient) { }

  getEventList(): Observable<any> {
    return this.http.get('https://events-app-api-faar.onrender.com/api/v1')
  }

  getEventDetails(id: string): Observable<any> {
    return this.http.get(`https://events-app-api-faar.onrender.com/api/v1/event/${id}`);
  }

  getEventPhoto(id: string): Observable<any> {
  return this.http.get(`https://events-app-api-faar.onrender.com/api/v1/event/photo/${id}`);
}
 getEvents(): Observable<any> {
  return this.http.get(`https://events-app-api-faar.onrender.com/api/v1/event/all`);
}
 getPaypal(id: string) {
    return this.http.get<any>(`https://events-app-api-faar.onrender.com/api/v1/user/vip_plane/${id}`)
  }

}
