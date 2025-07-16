import type { Parser } from "./Parser.js";

export function parseAlternatives<T>(parsers: readonly Parser<T>[]): Parser<T> {
	return (input, fromIndex) => {
		for (const parser of parsers) {
			const parsed = parser(input, fromIndex);
			if (parsed) {
				return parsed;
			}
		}

		return undefined;
	};
}
