import { parseAnyChar } from "./parseAnyChar.js";
import { createMonadResult, parseMonad } from "./parseMonad.js";
import { failParsing, type Parser } from "./Parser.js";

export function parseAnyCharBut(butChar: string): Parser<string> {
	return parseMonad(parseAnyChar, (char) =>
		char === butChar
			? failParsing(`Expected any char but ${JSON.stringify(char)}.`)
			: createMonadResult(char),
	);
}
