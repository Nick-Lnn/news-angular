import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _API_URL = '/api/news-service'; // Adjust this if needed

  constructor(private _http: HttpClient) {}

  public createBulletin(bulletinData: any, accountId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Account-ID': accountId.toString(),
      'User-ID': accountId.toString() // Assuming user ID is the same as account ID
    });

    return this._http.post(`${this._API_URL}/bulletins`, bulletinData, { headers });
  }
}
