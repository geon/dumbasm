import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import type { Parser } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export const parseNumber: Parser<number> = parseWithErrorMessage(
	"Expected a number.",
	parseDigits(10),
);

function parseDigits(base: number): Parser<number> {
	return parseMonad(parseOneOrMore(parseDigit(base)), (digits, { result }) =>
		result(parseInt(digits.join(""), base)),
	);
}
