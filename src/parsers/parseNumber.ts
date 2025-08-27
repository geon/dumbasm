import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";

export const parseNumber: Parser<number> = parseAlternatives([
	parseMonad(
		parseSequence([parseChar("$"), parseDigits(16)]),
		(parsed) => parsed[1],
	),
	parseDigits(10),
]);

function parseDigits(base: number): Parser<number> {
	return parseMonad(parseOneOrMore(parseDigit(base)), (digits) =>
		parseInt(digits.join(""), base),
	);
}
