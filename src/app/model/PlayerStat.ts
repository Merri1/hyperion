import { Game } from './game';
import { Player } from './Player';

export interface PlayerStat {
	id: number;
	game: Game;
	killCount: number;
	deathCount: number;
	totalScore: number;
	totalPlayTime: number;
	totalSessions: number;
	player: Player;
}