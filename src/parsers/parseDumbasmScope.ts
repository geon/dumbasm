import { parseAnyCharBut } from "./combinators/parseAnyCharBut.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import {
	type Parser,
	type ParserArgs,
	type ParseResult,
} from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseZeroOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import type { ParsedFile } from "./parseFile.js";

export function parseDumbasmScope(
	...args: ParserArgs
): ParseResult<ParsedFile> {
	return parseWithErrorMessage<ParsedFile>(
		"Expected scope.",
		parseSequenceIndex(1, [
			parseChar("{"),
			parseMonad(parseZeroOrMore(parseAnyCharBut("}")), (_, { result }) =>
				result([]),
			),
			parseChar("}"),
		]) as Parser<ParsedFile>,
	)(...args);
}
