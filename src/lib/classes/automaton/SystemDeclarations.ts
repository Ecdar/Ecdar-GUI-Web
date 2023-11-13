import type { FromRaw } from "./AutomatonClass";
import { Declarations } from "./Declarations";
import type { RawSystemDeclarations } from "./raw/RawSystemDeclarations";

/**
 * The top level system declarations
 */
export class SystemDeclarations extends Declarations<
	"System Declarations",
	RawSystemDeclarations
> {
	constructor(
		/**
		 * The declarations formatted as a string
		 * TODO: find a better way to represent declarations
		 */
		declarations: string = "",
	) {
		super("System Declarations", declarations);
	}

	/**
	 * Converts the SystemDeclarations to a RawSystemDeclarations
	 */
	toRaw() {
		return {
			name: this.type,
			declarations: this.declarations,
		};
	}

	/**
	 * Converts a RawSystemDeclarations to a SystemDeclarations
	 */
	static readonly fromRaw: FromRaw<
		RawSystemDeclarations,
		undefined,
		SystemDeclarations
	> = (raw) => {
		return new SystemDeclarations(raw.declarations);
	};
}
