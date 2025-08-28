import { parseAlternatives } from "../parseAlternatives.js";
import { parseAnyChar } from "../parseAnyChar.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAlternatives", [
	{
		name: "empty",
		parser: parseAlternatives([]),
		input: "abc",
		// TODO: Throw instead. The problem is invalid input.
		result: failParsing(),
	},
	{
		name: "no match",
		parser: parseAlternatives([parseAnyChar]),
		input: "",
		result: failParsing(),
	},
	{
		name: "match first",
		parser: parseAlternatives([parseAnyChar, parseAnyChar]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
	{
		name: "match second",
		parser: parseAlternatives([parseAnyChar, parseAnyChar]),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
