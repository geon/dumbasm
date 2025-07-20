import { parseNewline } from "../parseNewline.js";
import { testExamples } from "./testExamples.js";

testExamples("parseNewline", [
	{
		name: "no match",
		parser: parseNewline,
		input: "-",
		result: undefined,
	},
	{
		name: "match",
		parser: parseNewline,
		input: "\n",
		result: {
			consumed: 1,
			parsed: "\n",
		},
	},
]);
