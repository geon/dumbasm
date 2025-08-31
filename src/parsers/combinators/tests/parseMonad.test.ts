import { parseAnyChar } from "../parseAnyChar.js";
import {
	createMonadError,
	createMonadResult,
	parseMonad,
} from "../parseMonad.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseAnyChar, createMonadResult),
		input: "",
		result: failParsing(0, "Unexpectedly reached end of file."),
	},
	{
		name: "match",
		parser: parseMonad(parseAnyChar, (parsed) =>
			createMonadResult(parsed.toUpperCase()),
		),
		input: "abc",
		result: {
			type: "success",
			consumed: 1,
			parsed: "A",
		},
	},
	{
		name: "refused",
		parser: parseMonad(parseAnyChar, () => createMonadError("Custom message.")),
		input: "abc",
		result: failParsing(0, "Custom message."),
	},
]);
