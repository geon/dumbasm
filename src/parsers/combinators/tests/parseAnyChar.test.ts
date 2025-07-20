import { parseAnyChar } from "../parseAnyChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAnyChar", [
	{
		name: "no match",
		parser: parseAnyChar,
		input: "",
		result: undefined,
	},
	{
		name: "match",
		parser: parseAnyChar,
		input: "abc",
		fromIndex: 1,
		result: {
			consumed: 1,
			parsed: "b",
		},
	},
]);
