import { User } from './user';

/**
 * A model for Game data
 */
export interface Game {
	/** The unique ID of this Game */
	id: string;
	/** The name of this Game */
	name: string;
	/** The genre of this Game */
	genre: string;
	/** The date this Game was first registered */
	registrationDate: string;
	/** the User who owns/registered this game */
	owner: User;
}