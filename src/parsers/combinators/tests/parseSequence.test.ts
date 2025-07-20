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
	{
		name: "match",
		parser: parseSequence([parseAnyChar]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: ["a"],
		},
	},
	{
		name: "matches",
		parser: parseSequence([parseAnyChar, parseAnyChar, parseAnyChar]),
		input: "abc",
		result: {
			consumed: 3,
			parsed: ["a", "b", "c"],
		},
	},
]);
