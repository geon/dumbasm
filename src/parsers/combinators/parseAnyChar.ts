import { failParsing, type Parser } from "./Parser.js";

export const parseAnyChar: Parser<string> = (input, fromIndex) => {
	const parsed = input[fromIndex];
	if (parsed === undefined) {
		return failParsing("");
	}

	return {
		type: "success",
		consumed: 1,
		parsed,
	};
};
