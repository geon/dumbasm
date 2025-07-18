import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseDigit } from "./combinators/parseDigit.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export const parseIdentifier = parseWithErrorMessage<string>(
	"Expected an identifier",
	parseMonad(
		parseOneOrMore(parseAlternatives([parseAlpha, parseDigit(10)])),
		(parsed, { result }) => result(parsed.join("")),
	),
);
