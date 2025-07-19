import type { Parser } from "./Parser.js";

export function parseChar<Char extends string>(_char: Char): Parser<Char> {
	return (_input, _fromIndex) => {
		return undefined;
	};
}
