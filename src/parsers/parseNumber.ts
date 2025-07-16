import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import type { Parser } from "./combinators/Parser.js";

export type ParsedNumber = {
	format: "dec";
	value: number;
};

export const parseNumber = parseDigits();

function parseDigits(): Parser<ParsedNumber> {
	const base = 10;

	return parseMonad(parseOneOrMore(parseDigit(base)), (digits) => ({
		format: "dec",
		value: parseInt(digits.join(""), base),
	}));
}
