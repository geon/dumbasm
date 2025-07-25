import { parseAnyCharBut } from "./combinators/parseAnyCharBut.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { parseSequence } from "./combinators/parseSequence.js";

export const parseComment = parseMonad(
	parseSequence([
		parseChar(";"),
		parseOptional(parseOneOrMore(parseAnyCharBut("\n"))),
	]),
	([, comment]) => comment?.join("") ?? "",
);
