import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

/**
 * A base class for the Register Component
 */
@Component({
	standalone: true,
	selector: 'app-register',
	templateUrl: './register.component.html',
	imports: [
		MatCardModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		RouterLink,
		RouterLinkActive
	]
})
export class RegisterComponent implements OnInit {
	/** The registration form */
	public registerForm!: FormGroup;

	/**
	 * Constructor for the Register Components
	 * @param authenticationService For registering new users
	 */
	constructor(private authenticationService: AuthenticationService) {
	}

	/**
	 * Executed when Register Component is loaded. Creates blank form with validators on require fields.
	 */
	ngOnInit(): void {
		this.registerForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			kNumber: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required)
		});
	}

	/**
	 * Executed when 'Create Account' button is clicked. Passes form values to AuthenticationService
	 */
	public onSubmit() {
		// KNumber is opional so make it a blank string if it hasn't been entered
		if (this.registerForm.get('kNumber') == null) {
			this.registerForm.setValue({kNumber: ' '});
		}

		// Check form is valid before passing form values
		if (this.registerForm.valid) {
			this.authenticationService.register(
				this.registerForm.get('firstName').value,
				this.registerForm.get('lastName').value,
				this.registerForm.get('email').value,
				this.registerForm.get('password').value,
				this.registerForm.get('kNumber').value
			);
		}
	}

}
