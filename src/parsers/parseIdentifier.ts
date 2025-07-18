import { parseAlpha } from "./combinators/parseAlpha.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";

export const parseIdentifier = parseMonad(
	parseOneOrMore(parseAlpha),
	(parsed) => parsed.join(""),
);
