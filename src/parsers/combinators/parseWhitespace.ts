import { parseAnyChar } from "./parseAnyChar.js";
import { parseMonad } from "./parseMonad.js";

const whitespaces = [" ", "\t"];

export const parseWhitespace = parseMonad(
	parseAnyChar,
	(parsed, { error, result }) =>
		whitespaces.includes(parsed)
			? result(parsed)
			: error("Expected whitespace."),
);
