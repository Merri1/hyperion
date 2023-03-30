import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

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
	public registerForm!: FormGroup;

	constructor(private authenticationService: AuthenticationService) {
	}

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			kNumber: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required)
		});
	}

	public onSubmit() {
		if (this.registerForm.get('kNumber') == null) {
			this.registerForm.setValue({kNumber: ' '});
		}

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
