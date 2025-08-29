import { type Parser } from "./combinators/Parser.js";
import { parseAsmLine, type AsmFragment } from "./parseAsmLine.js";

export type ParsedFile = readonly AsmFragment[];

export const parseFile: Parser<ParsedFile> = parseAsmLine;
