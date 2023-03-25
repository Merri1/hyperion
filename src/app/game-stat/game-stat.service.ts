import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameStatService {

	constructor(private http: HttpClient) {
	}

	/** GET users from the server */
	// getUsers(): Observable<GameStatComponent[]> {
	// 	return this.http.get<GameStat[]>(this.usersUrl);
	//}
}
