import { parseError } from "../parseError.js";
import { parseMonad } from "../parseMonad.js";
import { createParseError } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseMonad", [
	{
		name: "no match",
		parser: parseMonad(parseError, (_, { result }) => result("")),
		input: "",
		result: createParseError(0, "forced error"),
	},
]);
