import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOptional } from "./combinators/parseOptional.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseComment } from "./parseComment.js";
import { parseDirective } from "./parseDirective.js";
import { parseLabel } from "./parseLabel.js";
import {
	parseMos6502Instruction,
	type ParsedMos6502Instruction,
} from "./parseMos6502Instruction.js";

export type AsmFragment =
	| {
			readonly type: "directive";
			readonly value: string;
	  }
	| {
			readonly type: "instruction";
			readonly value: ParsedMos6502Instruction;
	  }
	| {
			readonly type: "label";
			readonly value: string;
	  };

const parseInstrOrDir = parseKeyed({
	instruction: parseMos6502Instruction,
	directive: parseDirective,
});

export const parseAsmLine: Parser<readonly AsmFragment[]> =
	parseWithErrorMessage(
		"Expected asm code line.",
		parseAlternatives([
			parseSequenceIndex(0, [
				parseAlternatives([
					parseMonad(
						parseSequence([
							parseLabel,
							parseOptional(parseWhitespace),
							parseInstrOrDir,
						]),
						([label, , instrOrDir], { result }) =>
							result([{ type: "label" as const, value: label }, instrOrDir]),
					),
					parseMonad(parseLabel, (value, { result }) =>
						result([{ type: "label" as const, value }]),
					),
					parseMonad(parseInstrOrDir, (asmFragment, { result }) =>
						result([asmFragment]),
					),
				]),
				parseOptional(parseWhitespace),
				parseOptional(parseComment),
			]),
			parseMonad(
				parseSequence([parseOptional(parseWhitespace), parseComment]),
				(_, { result }) => result([]),
			),
			parseMonad(parseWhitespace, (_, { result }) => result([])),
		]),
	);
