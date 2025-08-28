import { parseAlpha } from "../parseAlpha.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAlpha", [
	{
		name: "no match",
		parser: parseAlpha,
		input: "-",
		result: failParsing(),
	},
	{
		name: "match low lowercase",
		parser: parseAlpha,
		input: "a",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
	{
		name: "match high lowercase",
		parser: parseAlpha,
		input: "z",
		result: {
			consumed: 1,
			parsed: "z",
		},
	},
	{
		name: "match low uppercase",
		parser: parseAlpha,
		input: "A",
		result: {
			consumed: 1,
			parsed: "A",
		},
	},
	{
		name: "match high uppercase",
		parser: parseAlpha,
		input: "Z",
		result: {
			consumed: 1,
			parsed: "Z",
		},
	},
]);
