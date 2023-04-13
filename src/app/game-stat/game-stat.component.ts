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

/**
 * A base class for the GameStat Component
 */
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
	/** Array for storing GameStat records */
	public gameStatList: GameStat[] = [];
	/** The webpage title */
	title = 'Game Statistics';
	/** Webpage table column names */
	displayedColumns: string[] = ['winCount', 'lossCount', 'totalPlayTime', 'totalSessions', 'totalPlayerCount', 'gameName'];

	/** For retrieving Game ID from URL */
	private routeSub: Subscription;
	/** ID of Game to show stats for */
	private gameId: string;

	/**
	 * The constructor for the GameStat class
	 * @param route For accessing data in the URL
	 * @param gameService For retrieving GameStat data
	 */
	constructor(private route: ActivatedRoute,
				private gameService: GameService) {
	}

	/**
	 * Executes when this component is loaded. Retrieves Game ID from URL and calls the getGameStats() method
	 */
	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			this.gameId = params['id']
		});
		this.getGameStats();
	}

	/**
	 * Calls the GameService to retrieves GameStats and filters them by the current Game ID
	 * @private
	 */
	private getGameStats(): void {
		this.gameService.getGameStats().subscribe(gameStat => {
			this.gameStatList = gameStat.filter(gameStat => gameStat.game.id === this.gameId);
		});
	}

}
