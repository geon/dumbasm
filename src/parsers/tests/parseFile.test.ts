import { parseFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseFile", [
	{
		name: "instruction",
		input: "inc",
		parser: parseFile,
		result: {
			consumed: 3,
			parsed: [
				{
					type: "instruction",
					value: {
						mnemonic: "inc",
						operand: undefined,
					},
				},
			],
		},
	},
	{
		name: "newline",
		input: "\n",
		parser: parseFile,
		result: {
			consumed: 1,
			parsed: [],
		},
	},
	{
		name: "instruction x 2",
		input: "inc\ntax",
		parser: parseFile,
		result: {
			consumed: 7,
			parsed: [
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
			],
		},
	},
]);
