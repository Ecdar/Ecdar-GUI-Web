/**
 * What the backend should do when visiting a Location
 * Not implemented in Reveeal yet
 */
export enum Urgency {
	/**
	 * Normal TIOA rules apply
	 */
	NORMAL = "NORMAL",

	/**
	 * ????
	 */
	PROHIBITED = "PROHIBITED",

	/**
	 * Make a move instantly no matter the timer
	 */
	URGENT = "URGENT",

	/**
	 * ????
	 */
	COMMITTED = "COMMITTED",
}
