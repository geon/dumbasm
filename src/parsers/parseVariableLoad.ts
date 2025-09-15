import type { Mos6502AddressingModeOfInstruction } from "../mos6502Instructions.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseString } from "./combinators/parseString.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseIdentifier } from "./parseIdentifier.js";
import type { ParsedAddressingModeCategory } from "./parseMos6502Instruction.js";
import {
	addressingModeParserByMnemonic,
	type GetAddressingModeCategory,
} from "./parseMos6502Instruction.js";

export type ParsedVariableLoad = {
	readonly variable: string;
	readonly addressingMode: ParsedAddressingModeCategory<
		GetAddressingModeCategory<Mos6502AddressingModeOfInstruction<"lda">>
	>;
};

export const parseVariableLoad = parseMonad(
	parseSequence([
		//
		parseString("ld"),
		parseWhitespace,
		parseIdentifier,
		addressingModeParserByMnemonic["lda"],
	]),
	([, , to, from], { result }) => {
		return result<ParsedVariableLoad>({
			variable: to,
			addressingMode: from as any,
		});
	},
);
