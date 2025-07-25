import { parseAnyChar } from "./parseAnyChar.js";
import { parseMonad } from "./parseMonad.js";
import type { Parser } from "./Parser.js";

export function parseAnyCharBut(butChar: string): Parser<string> {
	return parseMonad(parseAnyChar, (char) =>
		char === butChar ? undefined : char,
	);
}
