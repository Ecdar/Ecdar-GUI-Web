import { Raw, DeclarationType } from "../automaton";

/**
 * The top level declarations
 * */
export class Declaration
	implements Raw.SerializeRaw, Raw.ToRaw<Raw.RawDeclaration>
{
	type: DeclarationType;
	declarations: string;

	constructor(type = DeclarationType.GLOBAL, declarations = "") {
		this.type = type;
		this.declarations = declarations;
	}

	static readonly fromRaw: Raw.FromRaw<Raw.RawDeclaration, Declaration> = (
		raw,
	) => {
		return new Declaration(raw.name as DeclarationType, raw.declarations);
	};

	static readonly deserializeRaw: Raw.DeserializeRaw<Declaration> = (
		input,
	) => {
		const raw = Raw.parse(Raw.ZodRawDeclaration, input);
		return Declaration.fromRaw(raw);
	};

	toRaw() {
		return {
			name: this.type,
			declarations: this.declarations,
		};
	}

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}
}
