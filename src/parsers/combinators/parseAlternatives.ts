import {
	failParsing,
	parsingFailed,
	type ParseFailure,
	type Parser,
} from "./Parser.js";

export function parseAlternatives<TParsers extends readonly Parser<unknown>[]>(
	parsers: TParsers,
): Parser<Exclude<ReturnType<TParsers[number]>, ParseFailure>["parsed"]> {
	return (input, fromIndex) => {
		for (const parser of parsers) {
			const parsed = parser(input, fromIndex);
			if (!parsingFailed(parsed)) {
				return parsed;
			}
		}

		return failParsing();
	};
}
