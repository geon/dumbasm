import { parseAnyCharBut } from "../parseAnyCharBut.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAnyCharBut", [
	{
		name: "no match",
		parser: parseAnyCharBut("a"),
		input: "abc",
		result: failParsing(0, 'Expected any char but "a".'),
	},
	{
		name: "match",
		parser: parseAnyCharBut("b"),
		input: "abc",
		result: {
			type: "success",
			consumed: 1,
			parsed: "a",
		},
	},
]);
