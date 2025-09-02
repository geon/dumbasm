import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseEof } from "./combinators/parseEof.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";

export type ParsedFile = readonly AsmFragment[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseAlternatives([
			parseAsmLine,
			parseMonad(parseEof, (_, { result }) => result([])),
		]),
	)(...args);
}
