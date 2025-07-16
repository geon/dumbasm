import { parseOptional } from "../parseOptional.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseOptional", [
	{
		name: "no match",
		parser: parseOptional(parseChar("b")),
		input: "abc",
		result: {
			consumed: 0,
			parsed: undefined,
		},
	},
	{
		name: "match",
		parser: parseOptional(parseChar("a")),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
