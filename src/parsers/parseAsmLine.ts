import { parseEol } from "./combinators/parseEol.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOptional } from "./combinators/parseOptional.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseComment } from "./parseComment.js";
import { parseDirective } from "./parseDirective.js";
import { parseLabel } from "./parseLabel.js";
import {
	parseMos6502Instruction,
	type ParsedMos6502Instruction,
} from "./parseMos6502Instruction.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";

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

export type ParsedAsmLine = readonly AsmFragment[];

const parseFragment = <T>(parser: Parser<T>) =>
	parseOptional(
		parseSequenceIndex(1, [parseOptional(parseWhitespace), parser]),
	);

export const parseAsmLine: Parser<ParsedAsmLine> = parseMonad(
	parseSequence([
		parseFragment(parseLabel),
		parseFragment(
			parseKeyed({
				directive: parseDirective,
				instruction: parseMos6502Instruction,
			}),
		),
		parseFragment(parseComment),
		parseEol,
	]),
	([label, directiveOrInstruction, _comment]) => {
		const fragments = [];

		if (label !== undefined) {
			fragments.push({
				type: "label",
				value: label,
			} as const);
		}

		if (directiveOrInstruction) {
			fragments.push(directiveOrInstruction);
		}

		return fragments;
	},
);
