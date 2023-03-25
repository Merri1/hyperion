import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    return this.http.post(
      environment.dataEndpoint + '/login',
      {
        email: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<string> {
    return this.http.post(
      environment.dataEndpoint + '/register',
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
