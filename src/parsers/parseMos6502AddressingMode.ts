import {
	type Mos6502AddressingMode,
	type Mos6502Operand,
} from "../mos6502Instructions.js";
import { parseAlternatives } from "./combinators/parseAlternatives.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseString } from "./combinators/parseString.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseNumber, type ParsedNumber } from "./parseNumber.js";

type Operand =
	| {
			type: "number";
			number: ParsedNumber;
	  }
	| {
			type: "identifier";
			identifier: string;
	  };

type OperandForAddressingMode<AddressingMode extends Mos6502AddressingMode> =
	Mos6502Operand<AddressingMode, Operand>;

export type ParsedMos6502AddressingMode<
	AddressingMode extends Mos6502AddressingMode,
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
	AddressingMode extends "absolute" | "relative" | "zeropage",
>(
	addressingMode: AddressingMode,
): Parser<ParsedMos6502AddressingMode<"absolute" | "relative" | "zeropage">> {
	return parseMonad(parseOperand, (operand) => {
		if (
			addressingMode.slice(0, 8) === "zeropage" &&
			operand.type === "number" &&
			operand.number.value > 0xff
		) {
			return undefined;
		}

		return {
			addressingMode,
			operand,
		};
	});
}

function parseIndexedAddressingMode<
	AddressingMode extends
		| "absolute,X"
		| "absolute,Y"
		| "zeropage,X"
		| "zeropage,Y",
>(
	addressingMode: AddressingMode,
): Parser<
	ParsedMos6502AddressingMode<
		"absolute,X" | "absolute,Y" | "zeropage,X" | "zeropage,Y"
	>
> {
	return parseMonad(
		parseSequence([
			parseOperand,
			parseChar(","),
			parseChar(addressingMode.slice(-1)),
		]),
		([operand]) => {
			if (
				addressingMode.slice(0, 8) === "zeropage" &&
				operand.type === "number" &&
				operand.number.value > 0xff
			) {
				return undefined;
			}

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
	parseSequence([parseChar("("), parseOperand, parseString(",X)")]),
	([, operand]) => ({
		addressingMode: "(indirect,X)",
		operand,
	}),
);

const parseIndirectYAddressingMode: Parser<
	ParsedMos6502AddressingMode<"(indirect),Y">
> = parseMonad(
	parseSequence([parseChar("("), parseOperand, parseString("),Y")]),
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
	zeropage: parseNumberOperandAddressingMode("zeropage"),
	"absolute,X": parseIndexedAddressingMode("absolute,X"),
	"absolute,Y": parseIndexedAddressingMode("absolute,Y"),
	"zeropage,X": parseIndexedAddressingMode("zeropage,X"),
	"zeropage,Y": parseIndexedAddressingMode("zeropage,Y"),
	indirect: parseIndirectAddressingMode,
	"(indirect,X)": parseIndirectXAddressingMode,
	"(indirect),Y": parseIndirectYAddressingMode,
} as const satisfies Record<
	Exclude<Mos6502AddressingMode, "implied">,
	Parser<ParsedMos6502AddressingMode<Mos6502AddressingMode>>
>;
