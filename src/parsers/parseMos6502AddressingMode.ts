import {
	type Mos6502AddressingMode,
	type Mos6502Operand,
} from "../mos6502Instructions.js";
import { parseChar } from "./combinators/parseChar.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseString } from "./combinators/parseString.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseNumber, type ParsedNumber } from "./parseNumber.js";

type OperandForAddressingMode<AddressingMode extends Mos6502AddressingMode> =
	Mos6502Operand<
		AddressingMode,
		| {
				type: "number";
				number: ParsedNumber;
		  }
		| {
				type: "identifier";
				identifier: string;
		  }
	>;

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

const parseImmediateAddressingMode: Parser<
	ParsedMos6502AddressingMode<"immediate">
> = parseMonad(parseSequence([parseChar("#"), parseNumber]), ([, number]) => ({
	addressingMode: "immediate",
	operand: { type: "number", number },
}));

function parseNumberOperandAddressingMode<
	AddressingMode extends "absolute" | "relative" | "zeropage",
>(
	addressingMode: AddressingMode,
): Parser<ParsedMos6502AddressingMode<"absolute" | "relative" | "zeropage">> {
	return parseMonad(parseNumber, (number) => {
		if (addressingMode.slice(0, 8) === "zeropage" && number.value > 0xff) {
			return undefined;
		}

		return {
			addressingMode,
			operand: { type: "number", number },
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
			parseNumber,
			parseChar(","),
			parseChar(addressingMode.slice(-1)),
		]),
		([number]) => {
			if (addressingMode.slice(0, 8) === "zeropage" && number.value > 0xff) {
				return undefined;
			}

			return {
				addressingMode,
				operand: { type: "number", number: number },
			};
		},
	);
}

const parseIndirectAddressingMode: Parser<
	ParsedMos6502AddressingMode<"indirect">
> = parseMonad(parseNumber, (number) => ({
	addressingMode: "indirect",
	operand: { type: "number", number },
}));

const parseIndirectXAddressingMode: Parser<
	ParsedMos6502AddressingMode<"(indirect,X)">
> = parseMonad(
	parseSequence([parseChar("("), parseNumber, parseString(",X)")]),
	([, number]) => ({
		addressingMode: "(indirect,X)",
		operand: { type: "number", number },
	}),
);

const parseIndirectYAddressingMode: Parser<
	ParsedMos6502AddressingMode<"(indirect),Y">
> = parseMonad(
	parseSequence([parseChar("("), parseNumber, parseString("),Y")]),
	([, number]) => ({
		addressingMode: "(indirect),Y",
		operand: { type: "number", number },
	}),
);

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
