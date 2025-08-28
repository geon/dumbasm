import { parsingFailed, type Parser } from "./Parser.js";

export function parseOptional<T>(parser: Parser<T>): Parser<T | undefined> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		return parsingFailed(parsed)
			? {
					consumed: 0,
					parsed: undefined,
				}
			: parsed;
	};
}
