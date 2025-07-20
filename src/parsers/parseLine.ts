import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
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

export type ParsedLine = Partial<{
	readonly label: string;
	readonly directive: string;
	readonly instruction: ParsedMos6502Instruction;
	readonly comment: string;
}>;

const parseEof: Parser<undefined> = (input, fromIndex) =>
	input.length === fromIndex ? { consumed: 0, parsed: undefined } : undefined;

const parseEol = parseAlternatives([parseChar("\n"), parseEof]);

const optionalWhitespace = parseOptional(parseOneOrMore(parseWhitespace));

export const parseLine: Parser<ParsedLine> = parseMonad(
	parseSequence([
		optionalWhitespace,
		parseOptional(parseLabel),
		optionalWhitespace,
		parseOptional(parseAlternatives([parseDirective, parseMos6502Instruction])),
		optionalWhitespace,
		parseOptional(parseComment),
		parseEol,
	]),
	([, label, , directiveOrInstruction, , comment]) => {
		const [directive, instruction] =
			typeof directiveOrInstruction === "string"
				? [directiveOrInstruction, undefined]
				: [undefined, directiveOrInstruction];

		return {
			label,
			directive,
			instruction,
			comment,
		};
	},
);
