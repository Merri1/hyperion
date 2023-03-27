import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Game } from '../model/game';
import { GameStat } from '../model/game-stat';
import { User } from '../model/user';

@Injectable()
export class GameService {
	headers = {'content-type': 'application/json'};

	constructor(private http: HttpClient) {}

	public getGames(): Observable<any> {
		return this.http.get<Game[]>(environment.dataEndpoint + "/games");
	}

	public getGameStats(): Observable<any> {
		return this.http.get<GameStat[]>(environment.dataEndpoint + "/game-stats");
	}

	public addNewGame(gameName: string, gameGenre: string): Observable<any> {
		const user: User = {
			id: parseInt(localStorage.getItem('userId')),
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			kNumber: '',
			registrationDate: ''
		};

		let newGame: Game = {
			id: '',
			name: gameName,
			genre: gameGenre,
			registrationDate: '',
			owner: user
		}

		const body = JSON.stringify(newGame);

		return this.http.post(
			environment.dataEndpoint + '/games/new', body,{ 'headers': this.headers }
		);
	}
}