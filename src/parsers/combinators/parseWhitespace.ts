import { parseAnyChar } from "./parseAnyChar.js";
import { parseMonad } from "./parseMonad.js";
import { failParsing } from "./Parser.js";
import { parseOneOrMore } from "./parseSome.js";

const whitespaces = [" ", "\t"];

export const parseWhitespace = parseMonad(
	parseOneOrMore(
		parseMonad(parseAnyChar, (parsed) =>
			whitespaces.includes(parsed) ? parsed : failParsing(),
		),
	),
	(parsed) => parsed.join(""),
);
