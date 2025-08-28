import { failParsing, type Parser } from "./Parser.js";

export function parseMonad<T, T2>(
	_parser: Parser<T>,
	_transform: (parsed: T) => T2,
): Parser<T2> {
	return (_input, _fromIndex) => {
		return failParsing();
	};
}
