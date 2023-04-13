import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

import { PlayerStat } from '../model/PlayerStat';
import { PlayerStatService } from './player-stat.service';

/**
 * A base class for the PlayerStat Component
 */
@Component({
	standalone: true,
	selector: 'app-player-stat',
	imports: [
		MatTableModule,
		RouterLinkActive,
		MatButtonModule,
		RouterLink,
		DatePipe
	],
	templateUrl: './player-stat.component.html'
})
export class PlayerStatComponent implements OnInit {
	/** An array for PlayerStat records */
	public playerStatList: PlayerStat[] = [];
	/** Columns to be displayed in PlayerStat table */
	displayedColumns: string[] = ['displayName', 'gameName', 'killCount', 'deathCount', 'totalScore', 'totalPlayTime', 'totalSessions'];

	/**
	 * The constructor for the PlayerStat Component
	 * @param router For navigating to other web pages
	 * @param playerStatService For loading PlayerStat data
	 */
	constructor(
		private router: Router,
		private playerStatService: PlayerStatService) {
	}

	/**
	 * Executes when PlayerStat Component is loaded. Calls the getPlayerStats() method
	 */
	ngOnInit(): void {
		this.getPlayerStats();
	}

	/**
	 * Calls PlayerStatService to retrieve PlayerStat data. Filters returned data for the current logged in user ID
	 * @private
	 */
	private getPlayerStats(): void {
		this.playerStatService.getPlayerStats().subscribe(playerStat => {
			this.playerStatList = playerStat.filter(
				playerStat => playerStat.game.owner.id === parseInt(localStorage.getItem('userId')))
		});
	}
}
