import { failParsing } from "../Parser.js";
import { parseString } from "../parseString.js";
import { testExamples } from "./testExamples.js";

testExamples("parseString", [
	{
		name: "no match",
		parser: parseString("a"),
		input: "hello world",
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseString("hello"),
		input: "hello world",
		result: {
			consumed: 5,
			parsed: "hello",
		},
	},
]);
