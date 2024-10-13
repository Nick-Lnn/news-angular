import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../store/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _API_URL = '/api/user-service';

  private readonly _API_URL_AUTH = '/api/user-service/auth';

  constructor(private _http: HttpClient) {}

  registerUser(user: { username: string; firstName: string; lastName: string; password: string }): Observable<any> {
    return this._http.post(`${this._API_URL}/user`, user);
  }

  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post(`${this._API_URL_AUTH}/login`, credentials);
  }

  fetchUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this._API_URL}/user`, { headers });
  }
}
