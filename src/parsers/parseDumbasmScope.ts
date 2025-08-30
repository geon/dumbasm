import { parseMonad } from "./combinators/parseMonad.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseString } from "./combinators/parseString.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import type { ParsedFile } from "./parseFile.js";

export function parseDumbasmScope(
	...args: ParserArgs
): ParseResult<ParsedFile> {
	return parseWithErrorMessage<ParsedFile>(
		"Expected scope.",
		parseMonad(parseString("{}"), (_, { result }) => result([])),
	)(...args);
}
