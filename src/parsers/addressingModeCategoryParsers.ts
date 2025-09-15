import { parseChar } from "./combinators/parseChar.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseNothing } from "./combinators/parseNothing.js";
import { type Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseString } from "./combinators/parseString.js";
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

export const addressingModeCategoryParsers = {
	implied: parseNothing(undefined),
	accumulator: parseMonad(parseIdentifier, (identifier, { error, result }) =>
		identifier.toUpperCase() === "A"
			? result(undefined)
			: error("Expected A for accumulator."),
	),
	immediate: parseSequenceIndex(1, [parseChar("#"), parseNumber]),
	address: parseOperand,
	indexed: <T>(parseIndex: Parser<T>) =>
		parseMonad(
			parseSequence([parseOperand, parseChar(","), parseIndex]),
			([operand, , index], { result }) => result({ operand, index }),
		),
	indirect: parseSequenceIndex(1, [
		parseChar("("),
		parseOperand,
		parseChar(")"),
	]),
	preIndexedIndirect: <T>(parseIndex: Parser<T>) =>
		parseMonad(
			parseSequence([
				parseChar("("),
				parseOperand,
				parseChar(","),
				parseIndex,
				parseChar(")"),
			]),
			([, operand, , index], { result }) => result({ operand, index }),
		),
	postIndexedIndirect: <T>(parseIndex: Parser<T>) =>
		parseMonad(
			parseSequence([
				parseChar("("),
				parseOperand,
				parseString("),"),
				parseIndex,
			]),
			([, operand, , index], { result }) => result({ operand, index }),
		),
};
