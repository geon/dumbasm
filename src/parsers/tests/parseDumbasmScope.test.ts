import { parseDumbasmScope } from "../parseDumbasmScope.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";
import type { ParsedFile } from "../parseFile.js";

testExamples<ParsedFile>("parseDumbasmScope", [
	{
		input: "360 noscope",
		parser: parseDumbasmScope,
		result: createParseError(0, "Expected scope."),
	},
	{
		input: "{}",
		parser: parseDumbasmScope,
		result: createParseResult(2, []),
	},
	{
		name: "{\\n}",
		input: "{\n}",
		parser: parseDumbasmScope,
		result: createParseResult(3, []),
	},
	{
		name: "whitespace outside",
		input: " {} ",
		parser: parseDumbasmScope,
		result: createParseResult(4, []),
	},
	{
		input: "{} ; trailing comment",
		parser: parseDumbasmScope,
		result: createParseResult(21, []),
	},
	{
		name: "asm",
		input: `{
			tax
		}`,
		parser: parseDumbasmScope,
		result: createParseResult(12, [
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
		input: "{{}}",
		parser: parseDumbasmScope,
		result: createParseResult(4, [
			{
				type: "scope",
				value: [],
			},
		]),
	},
]);
