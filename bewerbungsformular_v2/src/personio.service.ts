import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonioService {
  createEmployee(_newEmployee: any ): Observable<any>  {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 192e5a1cd3635d73a038' // Token
    });

    throw new Error('Method not implemented.');
  }


  private apiUrl = 'https://api.personio.de/v1/auth';

  constructor(private http: HttpClient) { }


  sendFormData(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/submit`, formData, { headers });
  }
}
