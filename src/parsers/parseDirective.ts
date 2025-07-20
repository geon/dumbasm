import { parseAnyCharBut } from "./combinators/parseAnyCharBut.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseIdentifier } from "./parseIdentifier.js";

export const parseDirective = parseMonad(
	parseSequence([
		parseChar("."),
		parseIdentifier,
		parseOptional(parseOneOrMore(parseAnyCharBut("\n"))),
	]),
	(parsed) => parsed.flat().join(""),
);
