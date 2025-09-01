import { createParseResult } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import {
	parseMos6502AddressingMode,
	type ParsedMos6502AddressingMode,
} from "../parseMos6502AddressingMode.js";

testExamples<ParsedMos6502AddressingMode>("parseMos6502AddressingMode", [
	{
		input: "A",
		parser: parseMos6502AddressingMode,
		result: createParseResult(1, {
			type: "accumulator",
			value: undefined,
		}),
	},
	{
		input: "#123",
		parser: parseMos6502AddressingMode,
		result: createParseResult(4, {
			type: "immediate",
			value: 123,
		}),
	},
	{
		input: "$abcd,X",
		parser: parseMos6502AddressingMode,
		result: createParseResult(7, {
			type: "indexed",
			value: {
				index: "X",
				operand: {
					type: "number",
					value: 0xabcd,
				},
			},
		}),
	},
	{
		input: "$abcd,x",
		parser: parseMos6502AddressingMode,
		result: createParseResult(7, {
			type: "indexed",
			value: {
				index: "X",
				operand: {
					type: "number",
					value: 0xabcd,
				},
			},
		}),
	},
	{
		input: "$abcd",
		parser: parseMos6502AddressingMode,
		result: createParseResult(5, {
			type: "address",
			value: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "($abcd,X)",
		parser: parseMos6502AddressingMode,
		result: createParseResult(9, {
			type: "preIndexedIndirect",
			value: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "($abcd),Y",
		parser: parseMos6502AddressingMode,
		result: createParseResult(9, {
			type: "postIndexedIndirect",
			value: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "($abcd,x)",
		parser: parseMos6502AddressingMode,
		result: createParseResult(9, {
			type: "preIndexedIndirect",
			value: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
	{
		input: "($abcd),y",
		parser: parseMos6502AddressingMode,
		result: createParseResult(9, {
			type: "postIndexedIndirect",
			value: {
				type: "number",
				value: 0xabcd,
			},
		}),
	},
]);
