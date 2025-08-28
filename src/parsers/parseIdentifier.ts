import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export const parseIdentifier = parseWithErrorMessage<string>(
	"Expected an identifier",
	parseMonad(
		parseSequence([
			parseAlpha,
			parseOneOrMore(parseAlternatives([parseAlpha, parseDigit(10)])),
		]),
		(parsed, { result }) => result(parsed.flat().join("")),
	),
);
