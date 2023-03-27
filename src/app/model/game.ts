import { User } from './user';

export interface Game {
	id: string;
	name: string;
	genre: string;
	registrationDate: string;
	owner: User;
}