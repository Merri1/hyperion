import { HttpEvent,	HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

/**
 * Class for intercepting all HTTP requests for User verification
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	/**
	 * Constructor for TokenInterceptor
	 * @param authenticationService For verifying a User is logged in
	 */
	constructor(public authenticationService: AuthenticationService) { }

	/**
	 * Set the Authorization header of a HTTP request if the User is logged in
	 * @param request
	 * @param next
	 * @returns Cloned request with Authorization if user is logged in, else the original request
	 */
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (this.authenticationService.isUserLoggedIn()) {
			// If User logged in clone original request and add Authorization token to header
			let newRequest = request.clone({
				setHeaders: {
					Authorization: `Bearer ${this.authenticationService.getLoggedInUserId()}`,
				},
			});
			return next.handle(newRequest);
		}
		return next.handle(request);
	}
}
