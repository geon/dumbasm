import type { Parser } from "./Parser.js";

export const parseAnyChar: Parser<string> = (input, fromIndex) => {
	const parsed = input[fromIndex];
	if (parsed === undefined) {
		return undefined;
	}

	return {
		consumed: 1,
		parsed,
	};
};
