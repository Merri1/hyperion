import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationClient } from './authentication.client';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user: User = {
    email: '',
    firstName: '',
    id: 0, kNumber: '',
    lastName: '',
    password: '',
    registrationDate: ''
  };

  constructor(
      private authenticationClient: AuthenticationClient,
      private router: Router
  ) {}

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe(data => {
      this.user = data;

      if(this.user.id != null) {
        this.user.password = '';
        console.log(this.user);
        localStorage.setItem('userId', this.user.id.toString());
        localStorage.setItem('userEmail', this.user.email);
      }
      this.router.navigate(['/homepage']);
    });
  }

  public register(firstName: string, lastName: string, email: string, password: string, kNumber: string): void {
    this.authenticationClient
        .register(firstName, lastName, email, password, kNumber)
        .subscribe(data => {
          this.router.navigate(['/login']);
        });
  }

  public logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  public isUserLoggedIn(): boolean {
    let id = localStorage.getItem('userId');
    return (id != null && id.length > 0);
  }

  public getLoggedInUserId(): string | null {
    return this.isUserLoggedIn() ? localStorage.getItem('userId') : null;
  }
}
