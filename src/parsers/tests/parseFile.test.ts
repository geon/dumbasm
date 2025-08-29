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
]);
