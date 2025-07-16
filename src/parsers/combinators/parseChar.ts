import type { Parser } from "./Parser.js";

export function parseChar<Char extends string>(char: Char): Parser<Char> {
	if (char.length !== 1) {
		throw new Error(`Not a char: ${char}`);
	}

	return (input, fromIndex) => {
		if (!(input[fromIndex] === char)) {
			return undefined;
		}

		return {
			consumed: 1,
			parsed: char,
		};
	};
}
