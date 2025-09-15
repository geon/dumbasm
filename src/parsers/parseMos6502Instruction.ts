import { parseAlternatives } from "./combinators/parseAlternatives.js";
import {
	mos6502AddressingModesOfInstructions,
	mos6502Mnemonics,
	type Mos6502AddressingMode,
	type Mos6502AddressingModeOfInstruction,
	type Mos6502Mnemonic,
} from "../mos6502Instructions.js";
import { addressingModeCategoryParsers } from "./addressingModeCategoryParsers.js";
import { parseString } from "./combinators/parseString.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseDependent } from "./combinators/parseDependent.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";
import { mapRecord, objectFromEntries } from "../fp/record.js";
import { parseNothing } from "./combinators/parseNothing.js";
import { parseCharCaseInsensitive } from "./combinators/parseChar.js";

const mos6502AddressingModeCategoryParsers = {
	implied: addressingModeCategoryParsers.implied,
	accumulator: addressingModeCategoryParsers.accumulator,
	immediate: addressingModeCategoryParsers.immediate,
	address: addressingModeCategoryParsers.address,
	indexed: addressingModeCategoryParsers.indexed(
		parseAlternatives(["X", "Y"].map(parseCharCaseInsensitive)),
	),
	indirect: addressingModeCategoryParsers.indirect,
	preIndexedIndirect: addressingModeCategoryParsers.preIndexedIndirect(
		parseCharCaseInsensitive("X"),
	),
	postIndexedIndirect: addressingModeCategoryParsers.postIndexedIndirect(
		parseCharCaseInsensitive("Y"),
	),
};

export type AddressingModeCategory =
	keyof typeof mos6502AddressingModeCategoryParsers;

const categoryOfMos6502AddressingMode = {
	implied: "implied",
	accumulator: "accumulator",
	immediate: "immediate",
	absolute: "address",
	relative: "address",
	zeropage: "address",
	"absolute,X": "indexed",
	"absolute,Y": "indexed",
	"zeropage,X": "indexed",
	"zeropage,Y": "indexed",
	indirect: "indirect",
	"(indirect,X)": "preIndexedIndirect",
	"(indirect),Y": "postIndexedIndirect",
} as const satisfies Record<Mos6502AddressingMode, string>;

export type ParsedAddressingModeCategory<
	TAddressingModeCategory extends AddressingModeCategory,
> = {
	[Key in AddressingModeCategory]: (typeof mos6502AddressingModeCategoryParsers)[Key] extends Parser<
		infer T
	>
		? { type: Key; value: T }
		: never;
}[TAddressingModeCategory];

export type GetAddressingModeCategory<
	TAddressingMode extends Mos6502AddressingMode,
> = (typeof categoryOfMos6502AddressingMode)[TAddressingMode];

export type ParsedMos6502Instruction = {
	[TMnemonic in Mos6502Mnemonic]: {
		readonly mnemonic: TMnemonic;
		readonly addressingMode: ParsedAddressingModeCategory<
			GetAddressingModeCategory<Mos6502AddressingModeOfInstruction<TMnemonic>>
		>;
	};
}[Mos6502Mnemonic];

const parseMnemonic = parseWithErrorMessage(
	"Expected menmonic.",
	parseAlternatives(mos6502Mnemonics.map(parseString)),
);

const addressingModeCategoryParserEntriesOrderedBySpecificity = (
	[
		"immediate",
		"postIndexedIndirect",
		"preIndexedIndirect",
		"indirect",
		"indexed",
		"accumulator",
		"address",
		"implied",
	] as const
).map(
	(category) =>
		[
			category,
			category === "implied"
				? parseNothing(undefined)
				: parseSequenceIndex(1, [
						parseWhitespace,
						mos6502AddressingModeCategoryParsers[category],
					]),
		] as const,
);

export const addressingModeParserByMnemonic = mapRecord(
	mos6502AddressingModesOfInstructions,
	(modes) => {
		const supportedAddressingModeCategories = new Set(
			[...modes].map((mode) => categoryOfMos6502AddressingMode[mode]),
		);
		return parseKeyed(
			objectFromEntries(
				addressingModeCategoryParserEntriesOrderedBySpecificity.filter(
					([addressingModeCategory]) =>
						supportedAddressingModeCategories.has(addressingModeCategory),
				),
			),
		);
	},
);

export const parseMos6502Instruction: Parser<ParsedMos6502Instruction> =
	parseDependent(parseMnemonic, (mnemonic) =>
		parseMonad(
			addressingModeParserByMnemonic[mnemonic],
			(addressingMode, { result }) =>
				result({ mnemonic, addressingMode } as ParsedMos6502Instruction),
		),
	);
