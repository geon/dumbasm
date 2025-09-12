import { parseFile, type ParsedFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples<ParsedFile>("parseFile", [
	{
		input: "nonsense",
		parser: parseFile,
		result: createParseError(0, "SYNTAX ERROR"),
	},
	{
		name: "empty",
		input: "",
		parser: parseFile,
		result: createParseResult(0, []),
	},
	{
		input: "inc",
		parser: parseFile,
		result: createParseResult(3, [
			{
				type: "instruction",
				value: {
					mnemonic: "inc",
					operand: undefined,
				},
			},
		]),
	},
	{
		name: "\\ninc\\ntax\\n\\n",
		input: "\ninc\ntax\n\n",
		parser: parseFile,
		result: createParseResult(10, [
			{
				type: "instruction",
				value: {
					mnemonic: "inc",
					operand: undefined,
				},
			},
			{
				type: "instruction",
				value: {
					mnemonic: "tax",
					operand: undefined,
				},
			},
		]),
	},
]);
