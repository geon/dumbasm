import { parseOptional } from "../parseOptional.js";
import { parseAnyChar } from "../parseAnyChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseOptional", [
	{
		name: "no match",
		parser: parseOptional(parseAnyChar),
		input: "",
		result: {
			consumed: 0,
			parsed: undefined,
		},
	},
	{
		name: "match",
		parser: parseOptional(parseAnyChar),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
