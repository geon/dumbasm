import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import type { Parser } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";

export const parseNumber: Parser<number> = parseWithErrorMessage(
	"Expected a number.",
	parseAlternatives([
		parseSequenceIndex(1, [parseChar("$"), parseDigits(16)]),
		parseDigits(10),
	]),
);

function parseDigits(base: number): Parser<number> {
	return parseMonad(parseOneOrMore(parseDigit(base)), (digits, { result }) =>
		result(parseInt(digits.join(""), base)),
	);
}
