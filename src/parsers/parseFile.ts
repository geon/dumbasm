import { parseMonad } from "./combinators/parseMonad.js";
import { parseNewline } from "./combinators/parseNewline.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { type Parser } from "./combinators/Parser.js";
import { parseZeroOrMore } from "./combinators/parseSome.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";

export type ParsedFile = readonly AsmFragment[];

export const parseFile: Parser<ParsedFile> = parseMonad(
	parseZeroOrMore(
		parseSequenceIndex(0, [parseAsmLine, parseOptional(parseNewline)]),
	),
	(lines) => lines.flat(),
);
