import { parseAlternatives } from "../parseAlternatives.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAlternatives", [
	{
		name: "empty",
		parser: parseAlternatives([]),
		input: "abc",
		result: undefined,
	},
	{
		name: "no match",
		parser: parseAlternatives([parseChar("b")]),
		input: "abc",
		result: undefined,
	},
	{
		name: "match first",
		parser: parseAlternatives([parseChar("a"), parseChar("b")]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
	{
		name: "match second",
		parser: parseAlternatives([parseChar("b"), parseChar("a")]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
