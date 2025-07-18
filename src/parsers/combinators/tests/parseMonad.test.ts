import { parseChar } from "../parseChar.js";
import { parseMonad } from "../parseMonad.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseChar("b"), (x) => x),
		input: "abc",
		result: undefined,
	},
]);
