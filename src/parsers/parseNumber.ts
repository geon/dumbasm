import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import type { Parser } from "./combinators/Parser.js";

export const parseNumber: Parser<number> = parseMonad(
	parseOneOrMore(parseDigit(10)),
	(digits) => parseInt(digits.join(""), 10),
);
