import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { parseDirective } from "./parseDirective.js";
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

export const parseAsmLine: Parser<readonly AsmFragment[]> =
	parseWithErrorMessage(
		//
		"Expected asm code line.",
		parseMonad(
			parseKeyed({
				instruction: parseMos6502Instruction,
				directive: parseDirective,
			}),
			(asmFragment, { result }) => result([asmFragment]),
		),
	);
