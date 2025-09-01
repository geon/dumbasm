import { parsingFailed, type Parser } from "./Parser.js";

type TransformError = {
	readonly type: "monad error";
	readonly message: string;
};

type TransformSuccess<T> = {
	readonly type: "result";
	readonly value: T;
};

type TransformResult<T> = TransformSuccess<T> | TransformError;

export function parseMonad<T, T2>(
	parser: Parser<T>,
	_transform: (
		parsed: T,
		constructors: {
			readonly result: <T2>(value: T2) => TransformSuccess<T2>;
			readonly error: (message: string) => TransformError;
		},
	) => TransformResult<T2>,
): Parser<T2> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		if (parsingFailed(parsed)) {
			return parsed;
		}

		throw new Error("Not implemented.");
	};
}
