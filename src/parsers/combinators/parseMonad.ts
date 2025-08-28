import {
	failParsing,
	parsingFailed,
	type ParseFailure,
	type Parser,
} from "./Parser.js";

export function parseMonad<T, T2>(
	parser: Parser<T>,
	transform: (parsed: T) => T2 | ParseFailure,
): Parser<Exclude<T2, ParseFailure>> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		if (parsingFailed(parsed)) {
			return failParsing();
		}

		const transformed = transform(parsed.parsed);
		if (parsingFailed(transformed)) {
			return failParsing();
		}

		return {
			consumed: parsed.consumed,
			parsed: transformed as Exclude<T2, ParseFailure>,
		};
	};
}
