import { parseMonad } from "./combinators/parseMonad.js";
import { parseNewline } from "./combinators/parseNewline.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { type Parser } from "./combinators/Parser.js";
import { parseZeroOrMore } from "./combinators/parseSome.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseDumbasmLine, type DumbasmFragment } from "./parseDumbasmLine.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";

export type ParsedFile = readonly (AsmFragment | DumbasmFragment)[];

export const parseFile: Parser<ParsedFile> = parseMonad(
	parseZeroOrMore(
		parseSequenceIndex(0, [
			parseAlternatives([parseAsmLine, parseDumbasmLine]),
			parseOptional(parseNewline),
		]),
	),
	(lines) => lines.flat(),
);
