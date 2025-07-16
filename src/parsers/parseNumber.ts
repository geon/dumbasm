import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";

export type ParsedNumber = {
	format: "dec" | "hex";
	value: number;
};

export const parseNumber: Parser<ParsedNumber> = parseAlternatives([
	parseMonad(
		parseSequence([parseChar("$"), parseDigits("hex")]),

		(parsed) => parsed[1],
	),
	parseDigits("dec"),
]);

function parseDigits(format: ParsedNumber["format"]): Parser<ParsedNumber> {
	const base = {
		dec: 10,
		hex: 16,
	}[format];

	return parseMonad(parseOneOrMore(parseDigit(base)), (digits) => ({
		format,
		value: parseInt(digits.join(""), base),
	}));
}
