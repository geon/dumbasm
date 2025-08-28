import { failParsing, type Parser } from "./Parser.js";

export const parseAnyChar: Parser<string> = (_input, _fromIndex) => {
	return failParsing();
};
