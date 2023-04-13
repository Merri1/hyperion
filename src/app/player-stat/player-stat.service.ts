import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PlayerStat } from '../model/PlayerStat';

/**
 *	A base class for the PlayerStat Service
 */
@Injectable()
export class PlayerStatService {
	/** Headers for adding to HTTP requests */
	headers = {'content-type': 'application/json'};

	/**
	 * Constructor fot the PlayerStat Service
	 * @param http HttpClient for sending HTTP requests
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Sends HTTP GET request to the '/player-stats' endpoint of the server
	 * @returns Observable of PlayerStat data
	 */
	public getPlayerStats(): Observable<any> {
		return this.http.get<PlayerStat[]>(environment.dataEndpoint + '/player-stats');
	}
}