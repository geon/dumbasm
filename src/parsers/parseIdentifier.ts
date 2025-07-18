import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { parseSequence } from "./combinators/parseSequence.js";

export const parseIdentifier = parseMonad(
	parseSequence([
		parseAlpha,
		parseOptional(
			parseOneOrMore(parseAlternatives([parseAlpha, parseDigit(10)])),
		),
	]),
	(parsed) => parsed.flat().join(""),
);
