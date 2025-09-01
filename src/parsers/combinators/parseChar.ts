import { createParseError, type Parser } from "./Parser.js";

export function parseChar<Char extends string>(char: Char): Parser<Char> {
	if (char.length !== 1) {
		throw new Error(`Not a char: "${char}"`);
	}

	return (_, fromIndex) =>
		createParseError(fromIndex, `Expected char ${JSON.stringify(char)}.`);
}
