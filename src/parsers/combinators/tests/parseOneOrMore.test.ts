import { parseOneOrMore } from "../parseOneOrMore.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";
import { parseEol } from "../parseEol.js";

testExamples<readonly (string | undefined)[]>("parseOneOrMore", [
	{
		name: "match",
		parser: parseOneOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
	{
		name: "no match",
		parser: parseOneOrMore(parseChar("b")),
		input: "abc",
		result: undefined,
	},
	{
		name: "match zero length",
		parser: parseOneOrMore(parseEol),
		input: "",
		result: {
			consumed: 0,
			parsed: [undefined],
		},
	},
	{
		name: "match newline",
		parser: parseOneOrMore(parseEol),
		input: "\n",
		result: {
			consumed: 1,
			parsed: ["\n", undefined],
		},
	},
]);
