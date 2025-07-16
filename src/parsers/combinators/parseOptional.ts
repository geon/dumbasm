import type { Parser } from "./Parser.js";

export function parseOptional<T>(parser: Parser<T>): Parser<T | undefined> {
	return (input, fromIndex) => {
		return (
			parser(input, fromIndex) ?? {
				consumed: 0,
				parsed: undefined,
			}
		);
	};
}
