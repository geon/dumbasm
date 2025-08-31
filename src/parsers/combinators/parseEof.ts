import { failParsing, type Parser } from "./Parser.js";

export const parseEof: Parser<undefined> = (input, fromIndex) =>
	input.length === fromIndex
		? {
				type: "success",
				consumed: 0,
				parsed: undefined,
			}
		: failParsing("Expected end of file.");
