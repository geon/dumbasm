import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import type { Parser } from "./combinators/Parser.js";

export const parseNumber = parseDigits();

function parseDigits(): Parser<number> {
	return parseMonad(parseOneOrMore(parseDigit(10)), (digits) =>
		parseInt(digits.join(""), 10),
	);
}
