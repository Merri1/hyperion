import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public viewStats(): void {
    this.router.navigate(["/game-stat"]);
  }

  public viewGames(): void {
    this.router.navigate(["/game"]);
  }

}
