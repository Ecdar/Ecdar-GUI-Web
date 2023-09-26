import {
	type SerializeRaw,
	type ToRaw,
	type FromRaw,
	type DeserializeRaw,
	type RawDeclaration,
	DeclarationType
} from '../automaton';

/**
 * The top level declarations
 * */
export class Declaration implements SerializeRaw, ToRaw<RawDeclaration> {
	type: DeclarationType;
	declarations: string;

	constructor(type = DeclarationType.GLOBAL, declarations = '') {
		this.type = type;
		this.declarations = declarations;
	}

	static fromRaw: FromRaw<RawDeclaration, Declaration> = (raw) => {
		return new Declaration(raw.name as DeclarationType, raw.declarations);
	};

	static deserializeRaw: DeserializeRaw<Declaration> = (input) => {
		const raw = JSON.parse(input);
		return Declaration.fromRaw(raw);
	};

	toRaw() {
		return {
			name: this.type,
			declarations: this.declarations
		};
	}

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}
}
