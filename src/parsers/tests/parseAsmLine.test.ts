import { parseAsmLine } from "../parseAsmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseAsmLine", [
	{
		input: "nonsense",
		parser: parseAsmLine,
		result: failParsing(),
	},
	{
		name: "empty line",
		input: "",
		parser: parseAsmLine,
		result: {
			consumed: 0,
			parsed: [],
		},
	},
	{
		input: "myLabel: inc ; Comment",
		parser: parseAsmLine,
		result: {
			consumed: 22,
			parsed: [
				{
					type: "label",
					value: "myLabel",
				},
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
