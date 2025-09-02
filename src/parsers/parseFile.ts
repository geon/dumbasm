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
import { parseDumbasmScope } from "./parseDumbasmScope.js";

export type ParsedFile = readonly (
	| AsmFragment
	| DumbasmFragment
	| { readonly type: "scope"; readonly value: ParsedFile }
)[];

export const parseLines = parseMonad(
	parseZeroOrMore(
		parseAlternatives([
			//
			parseAsmLine,
			parseDumbasmLine,
			parseMonad(parseDumbasmScope, (scope, { result }) =>
				result({ type: "scope", value: scope } as const),
			),
			parseMonad(parseNewline, (_, { result }) => result(undefined)),
		]),
	),
	(matches, { result }) => result(matches.filter((match) => !!match).flat()),
);

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseSequenceIndex(0, [
			parseLines,
			parseMonad(parseEof, (_, { result }) => result([])),
		]),
	)(...args);
}
