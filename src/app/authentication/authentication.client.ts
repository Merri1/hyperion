import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

/**
 * A base class for handling User Login and Registration
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticationClient {
	/**
	 * Constructor for the AuthenticationClient
	 * @param http HttpClient for sending and receiving HTTP requests
	 */
	constructor(private http: HttpClient) {
	}

	/** Headers to be applied to any HTTP requests */
	headers = {'content-type': 'application/json'};

	/**
	 * Creates a User object with email and password from passed parameters and sends User data to the '/login'
	 * endpoint of the server
	 * @param email User email address
	 * @param password User password
	 * @returns Observable of the HTTP responce
	 */
	public login(email: string, password: string): Observable<any> {
		// Create User object with email and password that were passed
		const user: User = {
			id: 0,
			firstName: '',
			lastName: '',
			email: email,
			password: password,
			kNumber: '',
			registrationDate: ''
		};

		// Convert User object to JSON
		const body = JSON.stringify(user);

		// Send POST request to server with User body and headers
		return this.http.post(
			environment.dataEndpoint + '/login', body, {'headers': this.headers}
		);
	}

	/**
	 * Creates a User object using passed parameters. Send User data in a POST request to the server '/new-user' endpoint
	 * @param firstName User first name
	 * @param lastName User last name
	 * @param email User email address
	 * @param password User password
	 * @param kNumber User Knumber
	 */
	public register(firstName: string, lastName: string, email: string, password: string, kNumber: string): Observable<any> {
		// Create User object with passed values
		let newUser: User = {
			id: 0,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			kNumber: kNumber,
			registrationDate: ''
		}

		// Convert User object to JSON
		const body = JSON.stringify(newUser);

		// Send POST request to the server containing User object as body
		return this.http.post(
			environment.dataEndpoint + '/new-user', body, {'headers': this.headers}
		);
	}
}
