import { parseChar } from "../parseChar.js";
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
		parser: parseSequence([parseChar("b")]),
		input: "abc",
		result: undefined,
	},
	{
		name: "match",
		parser: parseSequence([parseChar("a")]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: ["a"],
		},
	},
]);
