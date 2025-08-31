import { failParsing, parsingFailed, type Parser } from "./Parser.js";

type TransformResult<T> =
	| {
			readonly type: "result";
			readonly value: T;
	  }
	| {
			readonly type: "monad error";
			readonly message: string;
	  };

export function createMonadResult<T>(value: T): TransformResult<T> {
	return {
		type: "result",
		value,
	};
}

export function createMonadError<T>(message: string): TransformResult<T> {
	return {
		type: "monad error",
		message,
	};
}

export function parseMonad<T, T2>(
	parser: Parser<T>,
	transform: (parsed: T) => TransformResult<T2>,
): Parser<T2> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		if (parsingFailed(parsed)) {
			return parsed;
		}

		const transformed = transform(parsed.parsed);
		if (transformed.type === "monad error") {
			return failParsing(transformed.message);
		}

		return {
			type: "success",
			consumed: parsed.consumed,
			parsed: transformed.value,
		};
	};
}
