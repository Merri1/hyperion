import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PlayerStat } from '../model/PlayerStat';

@Injectable()
export class PlayerStatService {
	headers = {'content-type': 'application/json'};

	constructor(private http: HttpClient) {
	}

	public getPlayerStats(): Observable<any> {
		return this.http.get<PlayerStat[]>(environment.dataEndpoint + '/player-stats');
	}
}