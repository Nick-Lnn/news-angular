import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user-service';

  constructor(private http: HttpClient) {}

  registerUser(user: { username: string; firstName: string; lastName: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, user);
  }
}
