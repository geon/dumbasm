import { parseAnyCharBut } from "../parseAnyCharBut.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAnyCharBut", [
	{
		name: "no match",
		parser: parseAnyCharBut("a"),
		input: "abc",
		result: undefined,
	},
	{
		name: "match",
		parser: parseAnyCharBut("b"),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
