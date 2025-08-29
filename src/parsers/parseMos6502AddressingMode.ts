import { parseAlternatives } from "./combinators/parseAlternatives.js";
import {
	parseChar,
	parseCharCaseInsensitive,
} from "./combinators/parseChar.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { failParsing, type Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseStringCaseInsensitive } from "./combinators/parseString.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseNumber } from "./parseNumber.js";

export type Operand =
	| {
			type: "number";
			value: number;
	  }
	| {
			type: "identifier";
			value: string;
	  };

const parseOperand: Parser<Operand> = parseKeyed({
	number: parseNumber,
	identifier: parseIdentifier,
});

export type ParsedMos6502AddressingMode =
	| {
			readonly type: "immediate";
			readonly value: number;
	  }
	| {
			readonly type: "preIndexedIndirect";
			readonly value: Operand;
	  }
	| {
			readonly type: "postIndexedIndirect";
			readonly value: Operand;
	  }
	| {
			readonly type: "indirect";
			readonly value: Operand;
	  }
	| {
			readonly type: "indexed";
			readonly value: {
				readonly operand: Operand;
				readonly index: "X" | "Y";
			};
	  }
	| {
			readonly type: "accumulator";
			readonly value: undefined;
	  }
	| {
			readonly type: "address";
			readonly value: Operand;
	  };

export const parseMos6502AddressingMode: Parser<ParsedMos6502AddressingMode> =
	parseKeyed({
		immediate: parseSequenceIndex(1, [parseChar("#"), parseNumber]),
		preIndexedIndirect: parseSequenceIndex(1, [
			parseChar("("),
			parseOperand,
			parseStringCaseInsensitive(",X)"),
		]),
		postIndexedIndirect: parseSequenceIndex(1, [
			parseChar("("),
			parseOperand,
			parseStringCaseInsensitive("),Y"),
		]),
		indirect: parseSequenceIndex(1, [
			parseChar("("),
			parseOperand,
			parseChar(")"),
		]),
		indexed: parseMonad(
			parseSequence([
				parseOperand,
				parseChar(","),
				parseAlternatives([
					parseCharCaseInsensitive("X"),
					parseCharCaseInsensitive("Y"),
				]),
			]),
			([operand, , index]) => ({ operand, index }),
		),
		accumulator: parseMonad(parseIdentifier, (identifier) =>
			// Don't match just any identifier starting with "A".
			identifier.toUpperCase() === "A" ? undefined : failParsing(),
		),
		address: parseOperand,
	});
