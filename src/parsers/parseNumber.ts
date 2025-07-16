import type { Parser } from "./combinators/Parser.js";

export type ParsedNumber = never;

export const parseNumber: Parser<ParsedNumber> = (_input, _fromIndex) => {
	return undefined;
};
