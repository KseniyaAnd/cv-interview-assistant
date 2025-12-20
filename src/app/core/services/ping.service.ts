import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  constructor(private readonly http: HttpClient) {}

  ping(): Observable<unknown> {
    return this.http.get('/api/ping');
  }
}
