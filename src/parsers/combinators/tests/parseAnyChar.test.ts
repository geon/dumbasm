import { parseAnyChar } from "../parseAnyChar.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAnyChar", [
	{
		name: "no match",
		parser: parseAnyChar,
		input: "",
		result: failParsing("Unexpectedly reached end of file."),
	},
	{
		name: "match",
		parser: parseAnyChar,
		input: "abc",
		fromIndex: 1,
		result: {
			type: "success",
			consumed: 1,
			parsed: "b",
		},
	},
]);
