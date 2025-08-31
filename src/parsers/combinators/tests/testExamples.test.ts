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
		parser: () => failParsing(""),
		input: "",
		result: failParsing(""),
	},
	{
		name: "match",
		parser: () => match,
		input: "",
		result: match,
	},
]);
