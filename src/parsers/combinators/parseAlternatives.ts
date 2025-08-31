import {
	failParsing,
	parsingFailed,
	type ParseFailure,
	type Parser,
} from "./Parser.js";

export function parseAlternatives<TParsers extends readonly Parser<unknown>[]>(
	parsers: TParsers,
): Parser<Exclude<ReturnType<TParsers[number]>, ParseFailure>["parsed"]> {
	return (...args) => {
		for (const parser of parsers) {
			const parsed = parser(...args);
			if (!parsingFailed(parsed)) {
				return parsed;
			}
		}

		return failParsing("");
	};
}
