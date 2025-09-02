import { parseError } from "./combinators/parseError.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { type AsmFragment } from "./parseAsmLine.js";

export type ParsedFile = readonly AsmFragment[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		//
		parseError,
	)(...args);
}
