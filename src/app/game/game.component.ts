import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Game } from '../model/game';
import { GameService } from './game.service';

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
	gameList: Game[] = [];
	title = 'Games';
	displayedColumns: string[] = ['id', 'name', 'genre', 'registrationDate', 'owner', 'button'];

	constructor(
		public dialog: MatDialog,
		private gameService: GameService) {
	}

	@ViewChild(MatSort) sort!: MatSort;

	ngOnInit() {
		this.getGames();
	}

	public getGames(): void {
		this.gameService.getGames().subscribe(games => {
			this.gameList = games.filter(game => game.owner.id === parseInt(localStorage.getItem('userId')))
		});
	}

	public addGame(): void {
		const dialogRef = this.dialog.open(AddGameDialog);

		dialogRef.afterClosed().subscribe();
	}
}

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
	public addGameForm!: FormGroup;

	constructor(
		private router: Router,
		private gameService: GameService) {
	}


	ngOnInit(): void {
		this.addGameForm = new FormGroup({
			name: new FormControl('', Validators.required),
			genre: new FormControl('', Validators.required),
		});
	}

	public addNewGame(): void {
		this.gameService.addNewGame(
			this.addGameForm.get('name').value,
			this.addGameForm.get('genre').value
		).subscribe(() => {
			this.router.navigate(['/game'])
				.then(() => {
					window.location.reload()
				});
		});
	}
}
