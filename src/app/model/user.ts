/**
 * A model for User data
 */
export interface User {
	/** The unique ID for this User */
	id: number;
	/** The first name of this User */
	firstName: string;
	/** The last name of this User */
	lastName: string;
	/** The email address of this User */
	email: string;
	/** The password of this User */
	password: string;
	/** The date this User registered their account */
	registrationDate: string;
	/** The optional KNumber of this User */
	kNumber: string;
}
