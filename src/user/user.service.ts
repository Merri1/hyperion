import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from "./user";

@Injectable()
export class UserService {
  usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}
