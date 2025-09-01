import { parseAlternatives } from "./combinators/parseAlternatives.js";
import {
	mos6502Mnemonics,
	type Mos6502Mnemonic,
} from "../mos6502Instructions.js";
import {
	parseMos6502AddressingMode,
	type ParsedMos6502AddressingMode,
} from "./parseMos6502AddressingMode.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseString } from "./combinators/parseString.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import type { Parser } from "./combinators/Parser.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export type ParsedMos6502Instruction = {
	readonly mnemonic: Mos6502Mnemonic;
	readonly operand: ParsedMos6502AddressingMode | undefined;
};

export const parseMos6502Instruction: Parser<ParsedMos6502Instruction> =
	parseMonad(
		parseSequence([
			parseWithErrorMessage(
				"Expected menmonic.",
				parseAlternatives(mos6502Mnemonics.map(parseString)),
			),
			parseOptional(
				parseSequenceIndex(1, [parseWhitespace, parseMos6502AddressingMode]),
			),
		]),
		([mnemonic, operand], { result }) =>
			result({
				mnemonic,
				operand,
			}),
	);
