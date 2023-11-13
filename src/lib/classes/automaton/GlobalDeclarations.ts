import type { FromRaw } from "./AutomatonClass";
import { Declarations } from "./Declarations";
import type { RawGlobalDeclarations } from "./raw/RawGlobalDeclarations";

/**
 * The top level global declarations
 */
export class GlobalDeclarations extends Declarations<
	"Global Declarations",
	RawGlobalDeclarations
> {
	constructor(
		/**
		 * The declarations formatted as a string
		 * TODO: find a better way to represent declarations
		 */
		declarations: string = "",
	) {
		super("Global Declarations", declarations);
	}

	/**
	 * Converts the GlobalDeclarations to a RawGlobalDeclarations
	 */
	toRaw() {
		return {
			name: this.type,
			declarations: this.declarations,
		};
	}

	/**
	 * Converts a RawGlobalDeclarations to a GlobalDeclarations
	 */
	static readonly fromRaw: FromRaw<
		RawGlobalDeclarations,
		undefined,
		GlobalDeclarations
	> = (raw) => {
		return new GlobalDeclarations(raw.declarations);
	};
}
