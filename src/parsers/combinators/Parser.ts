const parseFailure = Symbol("parseFailure");
export type ParseFailure = typeof parseFailure;

export type ParseResult<T> =
	| {
			consumed: number;
			parsed: T;
	  }
	| ParseFailure;

export type ParserArgs = readonly [input: string, fromIndex: number];

export type Parser<T> = (...args: ParserArgs) => ParseResult<T>;

export function failParsing(): ParseFailure {
	return parseFailure;
}

export function parsingFailed(
	parseResult: unknown,
): parseResult is ParseFailure {
	return parseResult === parseFailure;
}
