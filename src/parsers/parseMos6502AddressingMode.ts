import {
	type Mos6502AddressingMode,
	type Mos6502Operand,
} from "../mos6502Instructions.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import {
	parseChar,
	parseCharCaseInsensitive,
} from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseStringCaseInsensitive } from "./combinators/parseString.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseNumber, type ParsedNumber } from "./parseNumber.js";

export type ParsableMos6502AddressingMode = Exclude<
	Mos6502AddressingMode,
	// "zeropage" is just absolute with smaller values.
	"zeropage,X" | "zeropage,Y" | "zeropage"
>;

type Operand =
	| {
			type: "number";
			number: ParsedNumber;
	  }
	| {
			type: "identifier";
			identifier: string;
	  };

type OperandForAddressingMode<
	AddressingMode extends ParsableMos6502AddressingMode,
> = Mos6502Operand<AddressingMode, Operand>;

export type ParsedMos6502AddressingMode<
	AddressingMode extends ParsableMos6502AddressingMode,
> = {
	addressingMode: AddressingMode;
	operand: OperandForAddressingMode<AddressingMode>;
};

const parseAccumulatorAddressingMode: Parser<
	ParsedMos6502AddressingMode<"accumulator">
> = parseMonad(parseIdentifier, (identifier) => {
	if (identifier !== "A") {
		return undefined;
	}

	return {
		addressingMode: "accumulator",
		operand: undefined,
	};
});

const parseOperand: Parser<Operand> = parseAlternatives([
	parseMonad(
		parseNumber,
		(number): Operand => ({
			type: "number",
			number,
		}),
	),
	parseMonad(
		parseIdentifier,
		(identifier): Operand => ({
			type: "identifier",
			identifier,
		}),
	),
]);

const parseImmediateAddressingMode: Parser<
	ParsedMos6502AddressingMode<"immediate">
> = parseMonad(
	parseSequence([parseChar("#"), parseOperand]),
	([, operand]) => ({
		addressingMode: "immediate",
		operand,
	}),
);

function parseNumberOperandAddressingMode<
	AddressingMode extends "absolute" | "relative",
>(
	addressingMode: AddressingMode,
): Parser<ParsedMos6502AddressingMode<"absolute" | "relative">> {
	return parseMonad(parseOperand, (operand) => {
		return {
			addressingMode,
			operand,
		};
	});
}

function parseIndexedAddressingMode<
	AddressingMode extends "absolute,X" | "absolute,Y",
>(
	addressingMode: AddressingMode,
): Parser<ParsedMos6502AddressingMode<"absolute,X" | "absolute,Y">> {
	return parseMonad(
		parseSequence([
			parseOperand,
			parseChar(","),
			parseCharCaseInsensitive(addressingMode.slice(-1)),
		]),
		([operand]) => {
			return {
				addressingMode,
				operand,
			};
		},
	);
}

const parseIndirectAddressingMode: Parser<
	ParsedMos6502AddressingMode<"indirect">
> = parseMonad(parseOperand, (operand) => ({
	addressingMode: "indirect",
	operand,
}));

const parseIndirectXAddressingMode: Parser<
	ParsedMos6502AddressingMode<"(indirect,X)">
> = parseMonad(
	parseSequence([
		parseChar("("),
		parseOperand,
		parseStringCaseInsensitive(",X)"),
	]),
	([, operand]) => ({
		addressingMode: "(indirect,X)",
		operand,
	}),
);

const parseIndirectYAddressingMode: Parser<
	ParsedMos6502AddressingMode<"(indirect),Y">
> = parseMonad(
	parseSequence([
		parseChar("("),
		parseOperand,
		parseStringCaseInsensitive("),Y"),
	]),
	([, operand]) => ({
		addressingMode: "(indirect),Y",
		operand,
	}),
);

// TODO: Replace addressing mode parsers with addressing mode syntax parsers. The
// actual addressing mode is determined by the assembler. absolute can be used interchangably with zeropage for the zero page, etc.
export const mos6502AddressingModeParsers = {
	accumulator: parseAccumulatorAddressingMode,
	immediate: parseImmediateAddressingMode,
	absolute: parseNumberOperandAddressingMode("absolute"),
	relative: parseNumberOperandAddressingMode("relative"),
	"absolute,X": parseIndexedAddressingMode("absolute,X"),
	"absolute,Y": parseIndexedAddressingMode("absolute,Y"),
	indirect: parseIndirectAddressingMode,
	"(indirect,X)": parseIndirectXAddressingMode,
	"(indirect),Y": parseIndirectYAddressingMode,
} as const satisfies Record<
	Exclude<
		ParsableMos6502AddressingMode,
		// "implied" can't beparsed because it is *implied*.
		"implied"
	>,
	Parser<ParsedMos6502AddressingMode<ParsableMos6502AddressingMode>>
>;
