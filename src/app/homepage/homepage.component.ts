import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

/**
 * A base class for the Homepage Component
 */
@Component({
	standalone: true,
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	imports: [
		MatCardModule,
		MatButtonModule
	],
})
export class HomepageComponent implements OnInit {

	/**
	 * The constructor for the Homepage class
	 * @param authenticationService For logging user out of session
	 * @param router For navigating to different web pages
	 */
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {	}

	ngOnInit(): void { }

	/**
	 * Call the AuthenticationService to log the current user out
	 */
	public logout(): void {
		this.authenticationService.logout();
	}

	/**
	 * Navigate to the /player-stat web page
	 */
	public viewStats(): void {
		this.router.navigate(['/player-stat']);
	}

	/**
	 * Navigate to the /game page
	 */
	public viewGames(): void {
		this.router.navigate(['/game']);
	}

}
