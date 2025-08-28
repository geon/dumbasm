import { parseEof } from "../parseEof.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseEof", [
	{
		name: "no match",
		parser: parseEof,
		input: "-",
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseEof,
		input: "",
		result: {
			consumed: 0,
			parsed: undefined,
		},
	},
]);
