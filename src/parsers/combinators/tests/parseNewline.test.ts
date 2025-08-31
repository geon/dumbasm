import { parseNewline } from "../parseNewline.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseNewline", [
	{
		name: "no match",
		parser: parseNewline,
		input: "-",
		result: failParsing(""),
	},
	{
		name: "match",
		parser: parseNewline,
		input: "\n",
		result: {
			type: "success",
			consumed: 1,
			parsed: "\n",
		},
	},
]);
