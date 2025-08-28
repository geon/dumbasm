import { failParsing, type Parser } from "./Parser.js";

export const parseEof: Parser<undefined> = (input, fromIndex) =>
	input.length === fromIndex
		? { consumed: 0, parsed: undefined }
		: failParsing();
