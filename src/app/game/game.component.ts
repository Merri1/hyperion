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
import { Game } from '../model/game';
import { GameService } from './game.service';

@Component({
  standalone: true,
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameList: Game[] = [];
  title = 'Games';
  displayedColumns: string[] = ['id', 'name', 'genre', 'registrationDate', 'owner'];

  constructor(
      public dialog: MatDialog,
      private gameService: GameService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.gameService.getGames().subscribe(games => {
      this.gameList = games});
  }

  addGame(): void {
    const dialogRef = this.dialog.open(AddGameDialog);

    dialogRef.afterClosed().subscribe(result => {
    });
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

  ngOnInit(): void {
    this.addGameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }
}
