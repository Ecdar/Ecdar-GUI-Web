/**
 * Approves an object type if it is of form {
 *   field1? : (???) => ???,
 *   field2? : (???) => ???
 * }
 * */
type IsFeatureType<T> = {
	[K in keyof T]: T[K] extends undefined | ((...args: infer A) => infer R)
		? ((...args: A) => R) | undefined
		: never;
};

export class Features<T extends IsFeatureType<T>> {
	private readonly features: T;
	/**
	 * Executes the feature named functionName with ...args as parameters
	 * Throws a call a NULL value exeption if not implemented
	 * */
	execute<K extends keyof T>(
		functionName: K,
		...args: Parameters<NonNullable<T[K]>>
	): ReturnType<NonNullable<T[K]>> {
		return (this.features[functionName] as NonNullable<T[K]>)(
			args,
		) as ReturnType<NonNullable<T[K]>>;
	}

	/**
	 * Checks whether featureName is implemented or not
	 * */
	implements(featureName: keyof T): boolean {
		return this.features[featureName] !== undefined;
	}

	constructor(features: T) {
		this.features = features;
	}
}
