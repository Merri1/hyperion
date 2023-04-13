import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

/**
 * Class for checking if a User has permission to access the Component at the URL they have visited
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
	/**
	 * Constructor for AuthenticationGuard
	 * @param authenticationService AuthenticationService for checking if user is logged in
	 * @param router Router for redirecting User to web pages
	 */
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {	}

	/**
	 * Check is a user is logged in when they try to access a URL that requires being logged in
	 * @param route
	 * @param state
	 * @returns True if User is logged in. Else redirects User to '/login' web page.
	 */
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (!this.authenticationService.isUserLoggedIn()) {
			this.router.navigate(['/login']);
		}

		return true;
	}
}
