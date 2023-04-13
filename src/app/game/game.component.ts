import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';

import { Game } from '../model/game';
import { GameService } from './game.service';

/**
 * A base class for the Game Component
 */
@Component({
	standalone: true,
	selector: 'app-game',
	templateUrl: './game.component.html',
	imports: [
		MatTableModule,
		MatButtonModule,
		RouterLink,
		RouterLinkActive
	],
})
export class GameComponent implements OnInit {
	/** An array to store Game data */
	gameList: Game[] = [];
	/** The Page title */
	title = 'Games';
	/** The column titles for the Game table*/
	displayedColumns: string[] = ['id', 'name', 'genre', 'registrationDate', 'owner', 'button'];

	/**
	 * The constructor for the Game class
	 * @param dialog The Add Game popup dialog
	 * @param gameService The GameService for retrieving and sending Game data
	 */
	constructor(
		public dialog: MatDialog,
		private gameService: GameService) {
	}

	/**
	 * Executes when this Component is loaded and calls getGames() method
	 */
	ngOnInit() {
		this.getGames();
	}

	/**
	 * Call the GameService to retrieve Game data and filter data based on Logged in users ID
	 */
	public getGames(): void {
		this.gameService.getGames().subscribe(games => {
			this.gameList = games.filter(game => game.owner.id === parseInt(localStorage.getItem('userId')))
		});
	}

	/**
	 * Trigger the Add Game popup dialog
	 */
	public addGame(): void {
		const dialogRef = this.dialog.open(AddGameDialog);
		dialogRef.afterClosed().subscribe();
	}
}

/**
 * A base class for the AddGame popup dialog
 */
@Component({
	standalone: true,
	selector: 'add-game-dialog',
	templateUrl: 'add-game-dialog.html',
	imports: [
		MatDialogModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatInputModule
	]
})
export class AddGameDialog {
	/** Form group for Add Game popup */
	public addGameForm!: FormGroup;

	/**
	 * The constructor for the AddGameDialog class
	 * @param router For redirecting to webpage after game added
	 * @param gameService For saving new game data
	 */
	constructor(
		private router: Router,
		private gameService: GameService) {
	}

	/**
	 * Executes when this component is loaded and creates new blank form controls
	 */
	ngOnInit(): void {
		this.addGameForm = new FormGroup({
			name: new FormControl('', Validators.required),
			genre: new FormControl('', Validators.required),
		});
	}

	/**
	 * Calls GameService to save data new Game data contained in form
	 */
	public addNewGame(): void {
		this.gameService.addNewGame(
			// pass entered form values
			this.addGameForm.get('name').value,
			this.addGameForm.get('genre').value
		).subscribe(() => {
			// After data passed reload the game page
			this.router.navigate(['/game'])
				.then(() => {
					window.location.reload()
				});
		});
	}
}
