import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationClient {
	constructor(private http: HttpClient) {
	}

	headers = {'content-type': 'application/json'};

	public login(email: string, password: string): Observable<any> {
		const user: User = {
			id: 0,
			firstName: '',
			lastName: '',
			email: email,
			password: password,
			kNumber: '',
			registrationDate: ''
		};

		const body = JSON.stringify(user);

		return this.http.post(
			environment.dataEndpoint + '/login', body, {'headers': this.headers}
		);
	}

	public register(firstName: string, lastName: string, email: string, password: string, kNumber: string): Observable<any> {
		let newUser: User = {
			id: 0,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			kNumber: kNumber,
			registrationDate: ''
		}

		const body = JSON.stringify(newUser);

		return this.http.post(
			environment.dataEndpoint + '/new-user', body, {'headers': this.headers}
		);
	}
}
