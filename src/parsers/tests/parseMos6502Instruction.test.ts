import { testExamples } from "../combinators/tests/testExamples.js";
import { parseMos6502Instruction } from "../parseMos6502Instruction.js";

testExamples("parseMos6502Instruction", [
	{
		input: "no instruction",
		parser: parseMos6502Instruction,
		result: undefined,
	},
	{
		input: "lda #123",
		parser: parseMos6502Instruction,
		result: {
			consumed: 8,
			parsed: {
				mnemonic: "lda",
				addressingMode: "immediate",
				operand: { type: "number", number: { format: "dec", value: 123 } },
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
				addressingMode: "absolute",
				operand: { type: "number", number: { format: "hex", value: 0xffff } },
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
				addressingMode: "absolute,X",
				operand: { type: "number", number: { format: "hex", value: 0xffff } },
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
				addressingMode: "implied",
				operand: undefined,
			},
		},
	},
]);
