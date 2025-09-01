import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseIdentifier } from "./parseIdentifier.js";

export const parseLabel = parseMonad(
	parseSequence([parseIdentifier, parseChar(":")]),
	([label], { result }) => result(label),
);
