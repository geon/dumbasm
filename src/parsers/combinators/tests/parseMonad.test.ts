import { parseAnyChar } from "../parseAnyChar.js";
import { parseMonad } from "../parseMonad.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseAnyChar, (x) => x),
		input: "",
		result: undefined,
	},
]);
