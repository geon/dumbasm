const parseFailure = Symbol("parseFailure");
export type ParseFailure = typeof parseFailure;

export type ParseResult<T> =
	| {
			consumed: number;
			parsed: T;
	  }
	| ParseFailure;

export type Parser<T> = (input: string, fromIndex: number) => ParseResult<T>;

export function failParsing(): ParseFailure {
	return parseFailure;
}

export function parsingFailed(
	parseResult: unknown,
): parseResult is ParseFailure {
	return parseResult === parseFailure;
}
