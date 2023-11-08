/**
 * The type of a location
 *  - INITIAL
 *  - NORMAL
 *  - UNIVARSAL
 *  - INCONSISTENT or
 *  - ANY
 */
export enum LocationType {
	/**
	 * It is an initial Location
	 * only one allowed per Component
	 */
	INITIAL = "INITIAL",

	/**
	 * No modifiers
	 */
	NORMAL = "NORMAL",

	/**
	 * ?????
	 */
	UNIVERSAL = "UNIVERSAL",

	/**
	 * ?????
	 */
	INCONSISTENT = "INCONSISTENT",

	/**
	 * DO NOT USE
	 * Reveaal will panic
	 */
	ANY = "ANY",
}
