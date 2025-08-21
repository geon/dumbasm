import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseEol } from "./combinators/parseEol.js";
import { parseLookahead } from "./combinators/parseLookahead.js";
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

export type ParsedAsmLine = Partial<{
	readonly label: string;
	readonly directive: string;
	readonly instruction: ParsedMos6502Instruction;
}> & {
	readonly originalSource: string;
};

const optionalWhitespace = parseOptional(parseOneOrMore(parseWhitespace));

export const parseAsmLine: Parser<ParsedAsmLine> = parseMonad(
	parseSequence([
		optionalWhitespace,
		parseOptional(parseLabel),
		optionalWhitespace,
		parseOptional(parseAlternatives([parseDirective, parseMos6502Instruction])),
		optionalWhitespace,
		parseOptional(parseComment),
		parseLookahead(parseEol),
	]),
	([, label, , directiveOrInstruction, , _comment], originalSource) => {
		const [directive, instruction] =
			typeof directiveOrInstruction === "string"
				? [directiveOrInstruction, undefined]
				: [undefined, directiveOrInstruction];

		return {
			label,
			directive,
			instruction,
			originalSource,
		};
	},
);
