import { parseAnyChar } from "../parseAnyChar.js";
import { failParsing } from "../Parser.js";
import { parseSequence } from "../parseSequence.js";
import { testExamples } from "./testExamples.js";

testExamples<readonly string[]>("parseSequence", [
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
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseSequence([parseAnyChar]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: ["a"],
		},
	},
]);
