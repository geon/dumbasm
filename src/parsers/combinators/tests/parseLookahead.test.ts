import { parseChar } from "../parseChar.js";
import { parseLookahead } from "../parseLookahead.js";
import { testExamples } from "./testExamples.js";

testExamples("parseLookahead", [
	{
		name: "no match",
		parser: parseLookahead(parseChar("b")),
		input: "abc",
		result: undefined,
	},
	{
		name: "match",
		parser: parseLookahead(parseChar("a")),
		input: "abc",
		result: {
			consumed: 0,
			parsed: undefined,
		},
	},
]);
