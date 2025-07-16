import type { ParseResult } from "../Parser";
import { testExamples } from "./testExamples";

const match: ParseResult<"match"> = {
	consumed: 0,
	parsed: "match",
};

testExamples("testExamples", [
	{
		name: "no match",
		parser: () => undefined,
		input: "",
		result: undefined,
	},
	{
		name: "match",
		parser: () => match,
		input: "",
		result: match,
	},
]);
