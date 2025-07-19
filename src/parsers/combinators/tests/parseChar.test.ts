import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseChar", [
	{
		name: "no match",
		parser: parseChar("a"),
		input: "b",
		result: undefined,
	},
]);
