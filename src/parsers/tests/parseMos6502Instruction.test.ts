import { createParseError, createParseResult } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import {
	parseMos6502Instruction,
	type ParsedMos6502Instruction,
} from "../parseMos6502Instruction.js";

testExamples<ParsedMos6502Instruction>("parseMos6502Instruction", [
	{
		input: "no instruction",
		parser: parseMos6502Instruction,
		result: createParseError(0, "Expected menmonic."),
	},
	{
		input: "lda #123",
		parser: parseMos6502Instruction,
		result: createParseResult(8, {
			mnemonic: "lda",
			operand: {
				type: "immediate",
				value: 123,
			},
		}),
	},
	{
		input: "lda $ffff",
		parser: parseMos6502Instruction,
		result: createParseResult(9, {
			mnemonic: "lda",
			operand: {
				type: "address",
				value: { type: "number", value: 0xffff },
			},
		}),
	},
	{
		input: "lda $ffff,X",
		parser: parseMos6502Instruction,
		result: createParseResult(11, {
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
		}),
	},
	{
		input: "tax",
		parser: parseMos6502Instruction,
		result: createParseResult(3, {
			mnemonic: "tax",
			operand: undefined,
		}),
	},
]);
