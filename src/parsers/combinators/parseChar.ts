import { parseAnyChar } from "./parseAnyChar.js";
import {
	createMonadError,
	createMonadResult,
	parseMonad,
} from "./parseMonad.js";
import { type Parser } from "./Parser.js";

export function parseChar<Char extends string>(char: Char): Parser<Char> {
	if (char.length !== 1) {
		throw new Error(`Not a char: "${char}"`);
	}

	return parseMonad(parseAnyChar, (parsed) =>
		parsed !== char
			? createMonadError(`Expected char ${JSON.stringify(char)}.`)
			: createMonadResult(char),
	);
}
