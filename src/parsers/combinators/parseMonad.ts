import { failParsing, parsingFailed, type Parser } from "./Parser.js";

export function parseMonad<T, T2>(
	parser: Parser<T>,
	transform: (parsed: T) => T2,
): Parser<T2> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		if (parsingFailed(parsed)) {
			return failParsing();
		}

		return {
			consumed: parsed.consumed,
			parsed: transform(parsed.parsed),
		};
	};
}
