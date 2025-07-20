import { parseAnyChar } from "../parseAnyChar.js";
import { parseSequence } from "../parseSequence.js";
import { testExamples } from "./testExamples.js";

testExamples("parseSequence", [
	{
		name: "empty",
		parser: parseSequence([]),
		input: "abc",
		result: {
			consumed: 0,
			parsed: [],
		},
	},
	{
		name: "no match",
		parser: parseSequence([parseAnyChar]),
		input: "",
		result: undefined,
	},
]);
