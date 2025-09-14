import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOptional } from "./combinators/parseOptional.js";
import {
	type Parser,
	type ParserArgs,
	type ParseResult,
} from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseComment } from "./parseComment.js";
import { parseLines, type ParsedFile } from "./parseFile.js";

export function parseDumbasmScope(
	...args: ParserArgs
): ParseResult<ParsedFile> {
	return parseWithErrorMessage<ParsedFile>(
		"Expected scope.",
		parseSequenceIndex(2, [
			parseOptional(parseWhitespace),
			parseChar("{"),
			parseMonad(parseOptional(parseLines), (lines, { result }) =>
				result(lines ?? []),
			),
			parseChar("}"),
			parseOptional(parseWhitespace),
			parseOptional(parseComment),
		]) as Parser<ParsedFile>,
	)(...args);
}
