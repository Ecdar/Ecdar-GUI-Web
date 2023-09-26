import type { 
  SerializeRaw,
  ToRaw,
  FromRaw,
  DeserializeRaw,
  RawDeclaration
} from '../automaton'

export class Declaration implements SerializeRaw, ToRaw<RawDeclaration> {
	name: string;
	declarations: string;

	constructor(name = '', declarations = '') {
		this.name = name;
		this.declarations = declarations;
	}

	static fromRaw: FromRaw<RawDeclaration, Declaration> = (raw) => {
		return new Declaration(raw.name, raw.declarations);
	};

	static deserializeRaw: DeserializeRaw<Declaration> = (input) => {
		const raw = JSON.parse(input);
		return Declaration.fromRaw(raw);
	};

	toRaw() {
		return {
			name: this.name,
			declarations: this.declarations
		};
	};

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}
}
