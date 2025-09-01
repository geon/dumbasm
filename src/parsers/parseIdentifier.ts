import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export const parseIdentifier = parseWithErrorMessage<string>(
	"Expected an identifier",
	parseMonad(
		//
		parseOneOrMore(parseAlpha),
		(parsed, { result }) => result(parsed.join("")),
	),
);
