/**
 * The types of Properties that Ecdar suports,
 * They match the fields of an Edge
 */
export enum PropertyType {
	/**
	 * Matches no field
	 */
	NONE = "NONE",

	/**
	 * Links to the select property of an Edge
	 */
	SELECTION = "SELECTION",

	/**
	 * Links to the guard property of an Edge
	 */
	GUARD = "GUARD",

	/**
	 * Links to the sync property of an Edge
	 */
	SYNCHRONIZATION = "SYNCHRONIZATION",

	/**
	 * Links to the update property of an Edge
	 */
	UPDATE = "UPDATE",
}
