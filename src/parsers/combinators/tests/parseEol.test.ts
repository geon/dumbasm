import { parseEol } from "../parseEol.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseEol", [
	{
		name: "no match",
		parser: parseEol,
		input: "-",
		result: failParsing(),
	},
	{
		name: "match newline",
		parser: parseEol,
		input: "\nsecond line",
		result: {
			consumed: 0,
			parsed: "\n",
		},
	},
	{
		name: "match eof",
		parser: parseEol,
		input: "",
		result: {
			consumed: 0,
			parsed: undefined,
		},
	},
]);
