import { parseSequence } from "../parseSequence.js";
import { testExamples } from "./testExamples.js";

testExamples<readonly string[]>("parseSequence", [
	{
		name: "empty",
		parser: parseSequence([]),
		input: "abc",
		result: {
			consumed: 0,
			parsed: [],
		},
	},
]);
