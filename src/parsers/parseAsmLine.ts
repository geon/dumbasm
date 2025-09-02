import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
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
			parseMonad(parseLabel, (value, { result }) =>
				result([{ type: "label" as const, value }]),
			),
			parseMonad(parseInstrOrDir, (asmFragment, { result }) =>
				result([asmFragment]),
			),
		]),
	);
