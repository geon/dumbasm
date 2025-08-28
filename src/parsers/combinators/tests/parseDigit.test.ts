import { parseDigit } from "../parseDigit.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseDigit", [
	{
		name: "no match dec",
		parser: parseDigit(10),
		input: "-",
		result: failParsing(),
	},
	{
		name: "match low dec",
		parser: parseDigit(10),
		input: "0",
		result: {
			consumed: 1,
			parsed: "0",
		},
	},
	{
		name: "match high dec",
		parser: parseDigit(10),
		input: "9",
		result: {
			consumed: 1,
			parsed: "9",
		},
	},
	{
		name: "out of range dec",
		parser: parseDigit(10),
		input: "a",
		result: failParsing(),
	},
	{
		name: "match high hex",
		parser: parseDigit(16),
		input: "f",
		result: {
			consumed: 1,
			parsed: "f",
		},
	},
]);
