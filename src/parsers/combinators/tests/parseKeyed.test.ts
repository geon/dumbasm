import { parseKeyed } from "../parseKeyed.js";
import { testExamples } from "./testExamples.js";
import { parseChar } from "../parseChar.js";
import { failParsing } from "../Parser.js";

const parseA = parseChar("a");
const parseB = parseChar("b");

testExamples<unknown>("parseKeyed", [
	{
		name: "empty",
		parser: parseKeyed({}),
		input: "abc",
		result: failParsing(),
	},
	{
		name: "no match",
		parser: parseKeyed({ parseA }),
		input: "",
		result: failParsing(),
	},
	{
		name: "match first",
		parser: parseKeyed({ parseA, parseB }),
		input: "a",
		result: {
			consumed: 1,
			parsed: { type: "parseA", value: "a" },
		},
	},
	{
		name: "match second",
		parser: parseKeyed({ parseA, parseB }),
		input: "b",
		result: {
			consumed: 1,
			parsed: { type: "parseB", value: "b" },
		},
	},
]);
