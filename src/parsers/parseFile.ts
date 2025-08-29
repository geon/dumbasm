import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseEof } from "./combinators/parseEof.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseNewline } from "./combinators/parseNewline.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseZeroOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";
import { parseDumbasmLine, type DumbasmFragment } from "./parseDumbasmLine.js";

export type ParsedFile = readonly (AsmFragment | DumbasmFragment)[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseSequenceIndex(0, [
			parseMonad(
				parseZeroOrMore(
					parseAlternatives([
						//
						parseAsmLine,
						parseDumbasmLine,
						parseMonad(parseNewline, (_, { result }) => result(undefined)),
					]),
				),
				(matches, { result }) =>
					result(matches.filter((match) => !!match).flat()),
			),
			parseMonad(parseEof, (_, { result }) => result([])),
		]),
	)(...args);
}
