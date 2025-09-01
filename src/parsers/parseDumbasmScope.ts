import {
	createParseError,
	type ParserArgs,
	type ParseResult,
} from "./combinators/Parser.js";
import type { ParsedFile } from "./parseFile.js";

export function parseDumbasmScope(
	..._args: ParserArgs
): ParseResult<ParsedFile> {
	return createParseError(0, "Expected scope.");
}
