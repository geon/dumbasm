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
		input: "tax",
		parser: parseFile,
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
]);
