import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Game } from '../model/game';
import { GameStat } from '../model/game-stat';
import { User } from '../model/user';

/**
 * A base class form the GameService service
 */
@Injectable()
export class GameService {
	/** HTTP Headers for adding when sending requests to server */
	headers = {'content-type': 'application/json'};

	/**
	 * GameService constuctor
	 * @param http HttpClient for sending and receiving HTTP requests
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Send a HTTP GET request to the /games endpoint of the server
	 * @returns Observable of the HTTP response
	 */
	public getGames(): Observable<any> {
		return this.http.get<Game[]>(environment.dataEndpoint + '/games');
	}

	/**
	 * Send a HTTP GET request to the /game-stats endpoint of the server
	 * @returns Observable of the HTTP response
	 */
	public getGameStats(): Observable<any> {
		return this.http.get<GameStat[]>(environment.dataEndpoint + '/game-stats');
	}

	/**
	 * Create a new Game object from passed values and send HTTP POST request to the server with the new Game as the body
	 * @param gameName New game name
	 * @param gameGenre New game genre
	 * @returns Observable of the HTTP response
	 */
	public addNewGame(gameName: string, gameGenre: string): Observable<any> {
		// Create User object using logged in users ID
		const user: User = {
			id: parseInt(localStorage.getItem('userId')),
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			kNumber: '',
			registrationDate: ''
		};

		// Create Game object using values passed as arguments and User created above
		let newGame: Game = {
			id: '',
			name: gameName,
			genre: gameGenre,
			registrationDate: '',
			owner: user
		}

		// Convert newGame into JSON format
		const body = JSON.stringify(newGame);

		// Create POST request with newGame JSON as the body and send to server
		return this.http.post(
			environment.dataEndpoint + '/games/new', body, {'headers': this.headers}
		);
	}
}