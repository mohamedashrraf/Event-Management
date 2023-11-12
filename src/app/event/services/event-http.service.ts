import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHttpService {

   constructor(private http: HttpClient) { }

   getEventList(): Observable<any> {
    return this.http.get('http://localhost:4000/api/v1')
  }

  getEventDetails(id: string): Observable<any> {
  return this.http.get(`http://localhost:4000/api/v1/event/${id}`);
  }

  getEventPhoto(id: string): Observable<any> {
  return this.http.get(`http://localhost:4000/api/v1/event/photo/${id}`);
}
getEvents(): Observable<any> {
  return this.http.get(`http://localhost:4000/api/v1/event/all`);
}
}
