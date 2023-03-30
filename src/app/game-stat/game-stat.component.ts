import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../game/game.service';
import { GameStat } from '../model/game-stat';

@Component({
	standalone: true,
	selector: 'app-game-stat',
	templateUrl: './game-stat.component.html',
	imports: [
		MatButtonModule,
		RouterLink,
		RouterLinkActive,
		MatTableModule,
		DatePipe
	],
})
export class GameStatComponent implements OnInit {
	public gameStatList: GameStat[] = [];
	title = 'Game Statistics';
	displayedColumns: string[] = ['winCount', 'lossCount', 'totalPlayTime', 'totalSessions', 'totalPlayerCount', 'gameName'];

	private routeSub: Subscription;
	private gameId: string;

	constructor(private route: ActivatedRoute,
				private gameService: GameService) {
	}

	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			this.gameId = params['id']
		});
		this.getGameStats();
	}

	private getGameStats(): void {
		this.gameService.getGameStats().subscribe(gameStat => {
			this.gameStatList = gameStat.filter(gameStat => gameStat.game.id === this.gameId);
		});
	}

}
