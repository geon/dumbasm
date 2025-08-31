import { createParseError, type Parser } from "./Parser.js";

export const parseAnyChar: Parser<string> = (_input, fromIndex) => {
	return createParseError(fromIndex, "Unexpectedly reached end of file.");
};
