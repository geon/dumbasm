import type { Parser } from "./Parser.js";

export function parseChar<Char extends string>(char: Char): Parser<Char> {
	if (char.length !== 1) {
		throw new Error(`Not a char: ${char}`);
	}

	return (input, _fromIndex) => {
		if (!(input[0] === char)) {
			return undefined;
		}

		return {
			consumed: 1,
			parsed: char,
		};
	};
}
