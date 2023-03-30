import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

import { PlayerStat } from '../model/PlayerStat';
import { PlayerStatService } from './player-stat.service';

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
	public playerStatList: PlayerStat[] = [];
	public filteredPlayerStatList: PlayerStat[] = [];
	displayedColumns: string[] = ['displayName', 'gameName', 'killCount', 'deathCount', 'totalScore', 'totalPlayTime', 'totalSessions'];

	constructor(
		private router: Router,
		private playerStatService: PlayerStatService) {
	}

	ngOnInit(): void {
		this.getPlayerStats();
	}

	private getPlayerStats(): void {
		this.playerStatService.getPlayerStats().subscribe(playerStat => {
			this.playerStatList = playerStat.filter(
				playerStat => playerStat.game.owner.id === parseInt(localStorage.getItem('userId')))
		});
	}
}
