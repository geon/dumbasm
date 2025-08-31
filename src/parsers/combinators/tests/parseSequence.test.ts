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
			type: "success",
			consumed: 0,
			parsed: [],
		},
	},
	{
		name: "no match",
		parser: parseSequence([parseAnyChar]),
		input: "",
		result: failParsing("Unexpectedly reached end of file."),
	},
	{
		name: "match",
		parser: parseSequence([parseAnyChar]),
		input: "abc",
		result: {
			type: "success",
			consumed: 1,
			parsed: ["a"],
		},
	},
	{
		name: "matches",
		parser: parseSequence([parseAnyChar, parseAnyChar, parseAnyChar]),
		input: "abc",
		result: {
			type: "success",
			consumed: 3,
			parsed: ["a", "b", "c"],
		},
	},
]);
