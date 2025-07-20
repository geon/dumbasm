import { parseAnyChar } from "../parseAnyChar.js";
import { parseMonad } from "../parseMonad.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseAnyChar, (x) => x),
		input: "",
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseMonad(parseAnyChar, (parsed) => parsed.toUpperCase()),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "A",
		},
	},
]);
