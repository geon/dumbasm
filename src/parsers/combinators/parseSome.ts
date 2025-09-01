import { createParseResult, parsingFailed, type Parser } from "./Parser.js";

export function parseOneOrMore<T>(parser: Parser<T>): Parser<readonly T[]> {
	return parseSome(parser, 1);
}

export function parseZeroOrMore<T>(parser: Parser<T>): Parser<readonly T[]> {
	return parseSome(parser, 0);
}

function parseSome<T>(parser: Parser<T>, _min: number): Parser<readonly T[]> {
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
		}

		return createParseResult(consumed, parsed);
	};
}
