import type { FromRaw } from "./AutomatonClass";
import { Declarations } from "./Declarations";
import type { RawGlobalDeclarations } from "./raw/RawGlobalDeclarations";

/**
 * The top level global declarations
 */
export class GlobalDeclarations extends Declarations<RawGlobalDeclarations> {
	private id: "Global declarations" = "Global declarations";

	/**
	 * Converts the GlobalDeclarations to a RawGlobalDeclarations
	 */
	toRaw() {
		return {
			name: this.id,
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
