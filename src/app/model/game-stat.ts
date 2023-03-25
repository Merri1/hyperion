import { Game } from './game';


export interface GameStat {
	id: string;
	winCount: number;
	lossCount: number;
	totalPlayTime: number;
	totalSessions: number;
	totalPlayerCount: number;
	game: Game;
}