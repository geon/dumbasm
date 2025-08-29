import { failParsing, parsingFailed, type Parser } from "./Parser.js";

export function parseOneOrMore<T>(parser: Parser<T>): Parser<readonly T[]> {
	return parseSome(parser, 1);
}

export function parseZeroOrMore<T>(parser: Parser<T>): Parser<readonly T[]> {
	return parseSome(parser, 0);
}

function parseSome<T>(parser: Parser<T>, min: number): Parser<readonly T[]> {
	return (input, fromIndex) => {
		let consumed = 0;
		const parsed = [];
		for (;;) {
			const parseResult = parser(input, fromIndex + consumed);
			if (parsingFailed(parseResult)) {
				break;
			}

			consumed += parseResult.consumed;
			parsed.push(parseResult.parsed);

			// Prevent infinite loop on zero-width parsers.
			// When nothing is consumed, the same input would match again, inifinitely.
			if (!parseResult.consumed) {
				break;
			}
		}

		if (parsed.length < min) {
			return failParsing();
		}

		return {
			consumed,
			parsed,
		};
	};
}
