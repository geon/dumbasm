import { failParsing, type ParseResult } from "../Parser";
import { testExamples } from "./testExamples";

const match: ParseResult<"match"> = {
	type: "success",
	consumed: 0,
	parsed: "match",
};

testExamples("testExamples", [
	{
		name: "no match",
		parser: () => failParsing(0, "foo"),
		input: "",
		result: failParsing(0, "foo"),
	},
	{
		name: "match",
		parser: () => match,
		input: "",
		result: match,
	},
]);
