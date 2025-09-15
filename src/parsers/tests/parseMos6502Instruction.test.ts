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
		input: "lda #$123",
		parser: parseMos6502Instruction,
		result: createParseResult(9, {
			mnemonic: "lda",
			addressingMode: {
				type: "immediate",
				value: 0x123,
			},
		}),
	},
	{
		input: "lda $ffff",
		parser: parseMos6502Instruction,
		result: createParseResult(9, {
			mnemonic: "lda",
			addressingMode: {
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
			addressingMode: {
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
		result: createParseResult<
			Extract<ParsedMos6502Instruction, { mnemonic: "tax" }>
		>(3, {
			mnemonic: "tax",
			addressingMode: { type: "implied", value: undefined },
		}),
	},
]);
