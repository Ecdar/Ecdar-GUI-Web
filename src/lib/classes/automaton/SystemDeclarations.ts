import type { FromRaw } from "./AutomatonClass";
import { Declarations } from "./Declarations";
import type { RawSystemDeclarations } from "./raw/RawSystemDeclarations";

/**
 * The top level system declarations
 */
export class SystemDeclarations extends Declarations<RawSystemDeclarations> {
	private id: "System declarations" = "System declarations";

	/**
	 * Converts the SystemDeclarations to a RawSystemDeclarations
	 */
	toRaw() {
		return {
			name: this.id,
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
