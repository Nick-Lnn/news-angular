import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BulletinData {
  content: string;
  fileIds?: string[];
  senderUsername: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _API_URL = '/api/news-service'; // Adjust this if needed

  constructor(private _http: HttpClient) {}

  public createBulletin(bulletinData: BulletinData, accountId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Account-ID': accountId.toString(),
      'User-ID': userId.toString()
    });

    return this._http.post(`${this._API_URL}/bulletins`, bulletinData, { headers });
  }

  listBulletins(page: number = 0, size: number = 10): Observable<any> {
    return this._http.get(`${this._API_URL}/bulletins?page=${page}&size=${size}`);
  }
}
