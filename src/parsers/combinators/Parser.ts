export type ParseFailure = {
	type: "error";
	message: string;
	fromIndex: number;
};

type ParsingSuccess<T> = {
	type: "success";
	consumed: number;
	parsed: T;
};

export type ParseResult<T> = ParsingSuccess<T> | ParseFailure;

export type ParserArgs = readonly [input: string, fromIndex: number];

export type Parser<T> = (...args: ParserArgs) => ParseResult<T>;

export function failParsing(fromIndex: number, message: string): ParseFailure {
	return { type: "error", message, fromIndex };
}

// export function crerateParsingSuccess<T>(message: string): ParsingSuccess<> {
// 	return { type: "error", message };
// }

export function parsingFailed<T>(
	parseResult: ParseResult<T>,
): parseResult is ParseFailure {
	return parseResult.type === "error";
}
