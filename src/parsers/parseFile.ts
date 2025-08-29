import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseEof } from "./combinators/parseEof.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseNewline } from "./combinators/parseNewline.js";
import { type ParserArgs, type ParseResult } from "./combinators/Parser.js";
import { parseOneOrMore } from "./combinators/parseSome.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";
import { parseDumbasmLine, type DumbasmFragment } from "./parseDumbasmLine.js";

export type ParsedFile = readonly (AsmFragment | DumbasmFragment)[];

export function parseFile(...args: ParserArgs): ParseResult<ParsedFile> {
	return parseWithErrorMessage(
		"SYNTAX ERROR",
		parseAlternatives([
			parseMonad(
				parseOneOrMore(
					parseKeyed({
						asm: parseAsmLine,
						dumbasm: parseDumbasmLine,
						newline: parseNewline,
					}),
				),
				(matches, { result }) =>
					result(
						matches
							.filter((match) => match.type !== "newline")
							.map((match) => match.value)
							.flat(),
					),
			),
			parseMonad(parseEof, (_, { result }) => result([])),
		]),
	)(...args);
}
