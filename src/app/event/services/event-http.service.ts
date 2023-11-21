import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventHttpService {
  constructor(private http: HttpClient) {}

  getEventList(): Observable<any> {
    return this.http.get(environment.API_URL);
  }

  getEventDetails(id: string): Observable<any> {
    return this.http.get(environment.API_URL + `/event/${id}`);
  }

  getEventPhoto(id: string): Observable<any> {
    return this.http.get(environment.API_URL + `/event/photo/${id}`);
  }
  getEvents(): Observable<any> {
    return this.http.get(environment.API_URL + `/event/all`);
  }
  getPaypal(id: string) {
    return this.http.get<any>(environment.API_URL + `/user/vip_plane/${id}`);
  }
}
