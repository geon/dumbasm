import { parseAnyChar } from "../parseAnyChar.js";
import { createMonadResult, parseMonad } from "../parseMonad.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseAnyChar, createMonadResult),
		input: "",
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseMonad(parseAnyChar, (parsed) =>
			createMonadResult(parsed.toUpperCase()),
		),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "A",
		},
	},
	{
		name: "refused",
		parser: parseMonad(parseAnyChar, () => failParsing()),
		input: "abc",
		result: failParsing(),
	},
]);
