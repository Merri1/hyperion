import { Game } from './game';

/**
 * A model for GameStat data
 */
export interface GameStat {
	/** The unique ID for this GameStat */
	id: string;
	/** The number of wins */
	winCount: number;
	/** The number of losses */
	lossCount: number;
	/** The total time played */
	totalPlayTime: number;
	/** The total number of sessions */
	totalSessions: number;
	/** The total number of players */
	totalPlayerCount: number;
	/** The Game this GameStat is for */
	game: Game;
}