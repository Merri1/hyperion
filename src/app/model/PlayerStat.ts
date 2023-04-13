import { Game } from './game';
import { Player } from './Player';

/**
 * A model for PlayerStat data
 */
export interface PlayerStat {
	/** The unique ID for this PlayerStat */
	id: number;
	/** The Game this PlayerStat is for */
	game: Game;
	/** The kill count of this Player in this Game */
	killCount: number;
	/** The death count of this Player in this Game */
	deathCount: number;
	/** The total score of this Player in this Game */
	totalScore: number;
	/** The total play time of this Player in this Game */
	totalPlayTime: number;
	/** The number of session for this Player in this Game */
	totalSessions: number;
	/** The Player this PlayerStat is for */
	player: Player;
}