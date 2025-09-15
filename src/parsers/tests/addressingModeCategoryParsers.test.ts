import { createParseResult } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { parseIdentifier } from "../parseIdentifier.js";
import { addressingModeCategoryParsers } from "../addressingModeCategoryParsers.js";

testExamples<unknown>("addressingModeCategoryParsers", [
	{
		input: "A",
		parser: addressingModeCategoryParsers.accumulator,
		result: createParseResult(1, undefined),
	},
	{
		input: "#$123",
		parser: addressingModeCategoryParsers.immediate,
		result: createParseResult(5, 0x123),
	},
	{
		input: "$abcd,X",
		parser: addressingModeCategoryParsers.indexed(parseIdentifier),
		result: createParseResult(7, {
			index: "X",
			operand: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "$abcd",
		parser: addressingModeCategoryParsers.address,
		result: createParseResult(5, {
			type: "number",
			value: 0xabcd,
		}),
	},
	{
		input: "($abcd,X)",
		parser: addressingModeCategoryParsers.preIndexedIndirect(parseIdentifier),
		result: createParseResult(9, {
			index: "X",
			operand: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "($abcd),Y",
		parser: addressingModeCategoryParsers.postIndexedIndirect(parseIdentifier),
		result: createParseResult(9, {
			index: "Y",
			operand: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
]);
