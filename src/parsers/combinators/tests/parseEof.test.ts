import { parseEof } from "../parseEof.js";
import { testExamples } from "./testExamples.js";

testExamples("parseEof", [
	{
		name: "no match",
		parser: parseEof,
		input: "-",
		result: undefined,
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
