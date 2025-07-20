import { parseAnyChar } from "../parseAnyChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseAnyChar", [
	{
		name: "no match",
		parser: parseAnyChar,
		input: "",
		result: undefined,
	},
]);
