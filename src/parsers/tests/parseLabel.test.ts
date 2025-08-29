import { parseLabel } from "../parseLabel.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseLabel", [
	{
		input: "not a label",
		parser: parseLabel,
		result: failParsing(),
	},
	{
		input: "label: ; Code goes here",
		parser: parseLabel,
		result: {
			consumed: 6,
			parsed: "label",
		},
	},
]);
