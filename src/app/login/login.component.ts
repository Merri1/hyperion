import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '../authentication/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
	public loginForm!: FormGroup;

	constructor(private authenticationService: AuthenticationService) {
	}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required)
		});
	}

	public onSubmit() {
		if (this.loginForm.get('email').value != null && this.loginForm.get('password').value != null) {
			this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
		}
	}

}
