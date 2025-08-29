import { testExamples } from "../combinators/tests/testExamples.js";
import { parseMos6502AddressingMode } from "../parseMos6502AddressingMode.js";

testExamples("parseMos6502AddressingMode", [
	{
		input: "A",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 1,
			parsed: {
				type: "accumulator",
				value: undefined,
			},
		},
	},
	{
		input: "#123",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 4,
			parsed: {
				type: "immediate",
				value: 123,
			},
		},
	},
	{
		input: "$abcd,X",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 7,
			parsed: {
				type: "indexed",
				value: {
					index: "X",
					operand: {
						type: "number",
						value: 0xabcd,
					},
				},
			},
		},
	},
	{
		input: "$abcd,x",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 7,
			parsed: {
				type: "indexed",
				value: {
					index: "X",
					operand: {
						type: "number",
						value: 0xabcd,
					},
				},
			},
		},
	},
	{
		input: "$abcd",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 5,
			parsed: {
				type: "address",
				value: {
					type: "number",
					value: 0xabcd,
				},
			},
		},
	},
	{
		input: "($abcd,X)",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 9,
			parsed: {
				type: "preIndexedIndirect",
				value: {
					type: "number",
					value: 0xabcd,
				},
			},
		},
	},
	{
		input: "($abcd),Y",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 9,
			parsed: {
				type: "postIndexedIndirect",
				value: {
					type: "number",
					value: 0xabcd,
				},
			},
		},
	},
	{
		input: "($abcd,x)",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 9,
			parsed: {
				type: "preIndexedIndirect",
				value: {
					type: "number",
					value: 0xabcd,
				},
			},
		},
	},
	{
		input: "($abcd),y",
		parser: parseMos6502AddressingMode,
		result: {
			consumed: 9,
			parsed: {
				type: "postIndexedIndirect",
				value: {
					type: "number",
					value: 0xabcd,
				},
			},
		},
	},
]);
