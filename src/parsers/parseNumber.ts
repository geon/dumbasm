import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import type { Parser } from "./combinators/Parser.js";

export type ParsedNumber = {
	format: "dec";
	value: number;
};

export const parseNumber: Parser<ParsedNumber> = parseMonad(
	parseOneOrMore(parseDigit(10)),
	(digits) => ({
		format: "dec",
		value: parseInt(digits.join(""), 10),
	}),
);
