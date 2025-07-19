import { parseLabel } from "../parseLabel.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseLabel", [
	{
		input: "not a label",
		parser: parseLabel,
		result: undefined,
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
