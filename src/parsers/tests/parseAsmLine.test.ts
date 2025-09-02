import { parseAsmLine, type AsmFragment } from "../parseAsmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples<readonly AsmFragment[]>("parseAsmLine", [
	{
		name: "empty line",
		input: "",
		parser: parseAsmLine,
		result: createParseError(0, "Expected asm code line."),
	},
	{
		input: "tax",
		parser: parseAsmLine,
		result: createParseResult(3, [
			{
				type: "instruction",
				value: {
					mnemonic: "tax",
					addressingMode: {
						type: "implied",
						value: undefined,
					},
				},
			},
		]),
	},
	{
		input: ".byte 123",
		parser: parseAsmLine,
		result: createParseResult(9, [
			{
				type: "directive",
				value: ".byte 123",
			},
		]),
	},
	{
		input: "myLabel:",
		parser: parseAsmLine,
		result: createParseResult(8, [
			{
				type: "label",
				value: "myLabel",
			},
		]),
	},
	{
		input: "myLabel: .byte 123",
		parser: parseAsmLine,
		result: createParseResult(18, [
			{
				type: "label",
				value: "myLabel",
			},
			{
				type: "directive",
				value: ".byte 123",
			},
		]),
	},
	{
		input: "tax ; Comment",
		parser: parseAsmLine,
		result: createParseResult(13, [
			{
				type: "instruction",
				value: {
					mnemonic: "tax",
					addressingMode: {
						type: "implied",
						value: undefined,
					},
				},
			},
		]),
	},
	{
		input: "; Comment",
		parser: parseAsmLine,
		result: createParseResult(9, []),
	},
	{
		name: "whitespace",
		input: " ",
		parser: parseAsmLine,
		result: createParseResult(1, []),
	},
]);
