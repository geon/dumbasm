import { parseError } from "./combinators/parseError.js";
import type { Parser } from "./combinators/Parser.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { type ParsedMos6502Instruction } from "./parseMos6502Instruction.js";

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
		parseError,
	);
