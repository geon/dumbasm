import { parseAnyChar } from "./parseAnyChar.js";
import {
	createMonadError,
	createMonadResult,
	parseMonad,
} from "./parseMonad.js";
import { type Parser } from "./Parser.js";

export function parseAnyCharBut(butChar: string): Parser<string> {
	return parseMonad(parseAnyChar, (char) =>
		char === butChar
			? createMonadError(`Expected any char but ${JSON.stringify(char)}.`)
			: createMonadResult(char),
	);
}
