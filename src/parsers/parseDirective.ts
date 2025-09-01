import { parseAnyCharBut } from "./combinators/parseAnyCharBut.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseZeroOrMore } from "./combinators/parseSome.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseIdentifier } from "./parseIdentifier.js";

export const parseDirective = parseMonad(
	parseSequence([
		parseChar("."),
		parseIdentifier,
		parseZeroOrMore(parseAnyCharBut("\n")),
	]),
	(parsed, { result }) => result(parsed.flat().join("")),
);
