import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";

export const parseIdentifier = parseMonad(
	parseOneOrMore(parseAlternatives([parseAlpha, parseDigit(10)])),
	(parsed) => parsed.join(""),
);
