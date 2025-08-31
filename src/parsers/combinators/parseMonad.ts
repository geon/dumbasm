import {
	failParsing,
	parsingFailed,
	type ParseFailure,
	type Parser,
} from "./Parser.js";

type TransformResult<T> = {
	readonly type: "result";
	readonly value: T;
};

export function createMonadResult<T>(value: T): TransformResult<T> {
	return {
		type: "result",
		value,
	};
}

export function parseMonad<T, T2>(
	parser: Parser<T>,
	transform: (parsed: T) => TransformResult<T2> | ParseFailure,
): Parser<T2> {
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
			parsed: transformed.value,
		};
	};
}
