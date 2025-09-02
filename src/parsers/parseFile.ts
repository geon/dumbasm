import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseEof } from "./combinators/parseEof.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseNewline } from "./combinators/parseNewline.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";

export type ParsedFile = readonly AsmFragment[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseAlternatives([
			parseMonad(
				parseOneOrMore(
					parseKeyed({
						asm: parseAsmLine,
						newline: parseNewline,
					}),
				),
				(matches, { result }) =>
					result(
						matches
							.filter((match) => match.type === "asm")
							.flatMap((match) => match.value),
					),
			),
			parseMonad(parseEof, (_, { result }) => result([])),
		]),
	)(...args);
}
