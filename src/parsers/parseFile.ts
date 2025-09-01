import { parseEof } from "./combinators/parseEof.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { type AsmFragment } from "./parseAsmLine.js";

export type ParsedFile = readonly AsmFragment[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseMonad(parseEof, (_, { result }) => result([])),
	)(...args);
}
