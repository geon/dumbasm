import { parseEof } from "../parseEof.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseEof", [
	{
		name: "no match",
		parser: parseEof,
		input: "-",
		result: failParsing("Expected end of file."),
	},
	{
		name: "match",
		parser: parseEof,
		input: "",
		result: {
			type: "success",
			consumed: 0,
			parsed: undefined,
		},
	},
]);
