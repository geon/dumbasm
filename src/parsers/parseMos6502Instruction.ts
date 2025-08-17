import { parseAlternatives } from "./combinators/parseAlternatives.js";
import {
	mos6502AddressingModesOfInstructions,
	mos6502Mnemonics,
	type Mos6502AddressingMode,
	type Mos6502AddressingModeOfInstruction,
	type Mos6502Mnemonic,
} from "../mos6502Instructions.js";
import type { Parser } from "./combinators/Parser.js";
import {
	mos6502AddressingModeParsers,
	type ParsableMos6502AddressingMode,
	type ParsedMos6502AddressingMode,
} from "./parseMos6502AddressingMode.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseString } from "./combinators/parseString.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";

const parsableMos6502AddressingModes = Object.values({
	immediate: "immediate",
	accumulator: "accumulator",
	"absolute,X": "absolute,X",
	"absolute,Y": "absolute,Y",
	absolute: "absolute",
	"(indirect,X)": "(indirect,X)",
	"(indirect),Y": "(indirect),Y",
	relative: "relative",
	indirect: "indirect",
	implied: "implied",
} as const satisfies {
	[M in ParsableMos6502AddressingMode]: M;
});

export type ParsedMos6502Instruction = {
	[Mnemonic in Mos6502Mnemonic]: {
		mnemonic: Mnemonic;
	} & ParsedMos6502AddressingMode<
		Extract<
			Mos6502AddressingModeOfInstruction<Mnemonic>,
			ParsableMos6502AddressingMode
		>
	>;
}[Mos6502Mnemonic];

const mnemonicParser = parseAlternatives(mos6502Mnemonics.map(parseString));

function parseSkip(count: number): Parser<undefined> {
	return () => ({ consumed: count, parsed: undefined });
}

export const parseMos6502Instruction: Parser<ParsedMos6502Instruction> = (
	input,
	fromIndex,
) => {
	const parsedMnemonic = mnemonicParser(input, fromIndex);
	if (!parsedMnemonic) {
		return undefined;
	}

	return parseMonad(
		parseSequence([
			// Skip the already parsed mnemonic.
			parseSkip(parsedMnemonic.consumed),
			parseAlternatives(
				parsableMos6502AddressingModes
					.filter((addressingMode) =>
						(
							mos6502AddressingModesOfInstructions[
								parsedMnemonic.parsed
							] as ReadonlySet<Mos6502AddressingMode>
						).has(addressingMode),
					)
					.map(
						(
							addressingMode,
						): Parser<
							ParsedMos6502AddressingMode<ParsableMos6502AddressingMode>
						> =>
							addressingMode === "implied"
								? parseMonad(parseSequence([]), () => ({
										addressingMode: "implied",
										operand: undefined,
									}))
								: parseMonad(
										parseSequence([
											parseOneOrMore(parseWhitespace),
											mos6502AddressingModeParsers[addressingMode],
										]),
										([, parsedAddressingMode]) => parsedAddressingMode,
									),
					),
			),
		]),
		([, addressingMode]): ParsedMos6502Instruction =>
			({
				mnemonic: parsedMnemonic.parsed,
				...addressingMode,
			}) as ParsedMos6502Instruction,
	)(input, fromIndex);
};
