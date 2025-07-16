import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import type { Parser } from "./combinators/Parser.js";

export type ParsedNumber = {
	format: "dec";
	value: number;
};

export const parseNumber = parseDigits("dec");

function parseDigits(format: ParsedNumber["format"]): Parser<ParsedNumber> {
	const base = {
		dec: 10,
	}[format];

	return parseMonad(parseOneOrMore(parseDigit(base)), (digits) => ({
		format,
		value: parseInt(digits.join(""), base),
	}));
}
