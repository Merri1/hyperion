import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '../authentication/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * A base class for the Login Component
 */
@Component({
	standalone: true,
	selector: 'login',
	templateUrl: './login.component.html',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		RouterLink,
		RouterLinkActive
	],
})
export class LoginComponent implements OnInit {
	/** The Log In form */
	public loginForm!: FormGroup;

	/**
	 * The constructor for the Login Component
	 * @param authenticationService For verifying entered email and password
	 */
	constructor(private authenticationService: AuthenticationService) {
	}

	/**
	 * Executed when this Component is loaded. Creates a blank Login form with validators on each field
	 */
	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required)
		});
	}

	/**
	 * Executes when 'Log In' button is clicked. Passed entered form values to the AuthenticationService
	 */
	public onSubmit() {
		if (this.loginForm.get('email').value != null && this.loginForm.get('password').value != null) {
			this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
		}
	}

}
