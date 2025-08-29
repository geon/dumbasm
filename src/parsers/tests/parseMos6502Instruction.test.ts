import { failParsing } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { parseMos6502Instruction } from "../parseMos6502Instruction.js";

testExamples("parseMos6502Instruction", [
	{
		input: "no instruction",
		parser: parseMos6502Instruction,
		result: failParsing(),
	},
	{
		input: "lda #123",
		parser: parseMos6502Instruction,
		result: {
			consumed: 8,
			parsed: {
				mnemonic: "lda",
				operand: {
					type: "immediate",
					value: 123,
				},
			},
		},
	},
	{
		input: "lda $ffff",
		parser: parseMos6502Instruction,
		result: {
			consumed: 9,
			parsed: {
				mnemonic: "lda",
				operand: {
					type: "address",
					value: { type: "number", value: 0xffff },
				},
			},
		},
	},
	{
		input: "lda $ffff,X",
		parser: parseMos6502Instruction,
		result: {
			consumed: 11,
			parsed: {
				mnemonic: "lda",
				operand: {
					type: "indexed",
					value: {
						index: "X",
						operand: {
							type: "number",
							value: 0xffff,
						},
					},
				},
			},
		},
	},
	{
		input: "tax",
		parser: parseMos6502Instruction,
		result: {
			consumed: 3,
			parsed: {
				mnemonic: "tax",
				operand: undefined,
			},
		},
	},
]);
