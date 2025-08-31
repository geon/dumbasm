import { parseAnyChar } from "./parseAnyChar.js";
import { createMonadResult, parseMonad } from "./parseMonad.js";
import { failParsing, type Parser } from "./Parser.js";

export function parseChar<Char extends string>(char: Char): Parser<Char> {
	if (char.length !== 1) {
		throw new Error(`Not a char: "${char}"`);
	}

	return parseMonad(parseAnyChar, (parsed) =>
		parsed !== char
			? failParsing(`Expected char ${JSON.stringify(char)}.`)
			: createMonadResult(char),
	);
}
