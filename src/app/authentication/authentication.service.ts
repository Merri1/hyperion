import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationClient } from './authentication.client';

/**
 * A base class for the Authentication Service
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	/** The User loggin in */
	private user: User = {
		email: '',
		firstName: '',
		id: 0, kNumber: '',
		lastName: '',
		password: '',
		registrationDate: ''
	};

	/**
	 * Constructor for the AuthenticationService
	 * @param authenticationClient
	 * @param router For redirecting User to web pages
	 */
	constructor(
		private authenticationClient: AuthenticationClient,
		private router: Router
	) {
	}

	/**
	 * Checks if User details email and password match a record in the database. If Login is valid, redirect to
	 * '/homepage', else redirect to '/login' web page.
	 * @param email Email address of User logging in
	 * @param password Password of User logging in
	 */
	public login(email: string, password: string): void {
		// Call authenticationClient to request database record matching passed email and password
		this.authenticationClient.login(email, password).subscribe(data => {
			this.user = data;

			// If User does not have a database record the returned ID will be null
			if(this.user.id == null) {
				// Redirect to the '/login' as User login details were not correct
				this.router.navigate(['/login']).then(() => {
					window.location.reload()
				});
			}
			else {
				// Replace User hashed password with empty value and save user ID and eMail in local storage
				this.user.password = '';
				localStorage.setItem('userId', this.user.id.toString());
				localStorage.setItem('userEmail', this.user.email);
			}
			// Redirect logged in User to the '/homepage' web page
			this.router.navigate(['/homepage']);
		});
	}

	/**
	 * Registers a new site User
	 * @param firstName New User first name
	 * @param lastName New User last name
	 * @param email New User email address
	 * @param password New User password
	 * @param kNumber New user kNumber
	 */
	public register(firstName: string, lastName: string, email: string, password: string, kNumber: string): void {
		// Pass parameters to the authenticationClient register() method and the redirect to the '/login' web page
		this.authenticationClient
			.register(firstName, lastName, email, password, kNumber)
			.subscribe(() => {
				this.router.navigate(['/login']);
			});
	}

	/**
	 * Logs a User out by deleting their ID and eMail in local storage and then redirects to the '/login' web page.
	 */
	public logout() {
		localStorage.removeItem('userId');
		localStorage.removeItem('userEmail');
		this.router.navigate(['/login']);
	}

	/**
	 * Checks whether a User is logged in
	 * @returns True if a User ID is stored in local storage. False if no User ID is in local storage.
	 */
	public isUserLoggedIn(): boolean {
		let id = localStorage.getItem('userId');
		return (id != null && id.length > 0);
	}

	/**
	 * Retrieves the logged in Users ID if it exists
	 * @returns A User ID if a user is logged in, else null
	 */
	public getLoggedInUserId(): string | null {
		return this.isUserLoggedIn() ? localStorage.getItem('userId') : null;
	}
}
