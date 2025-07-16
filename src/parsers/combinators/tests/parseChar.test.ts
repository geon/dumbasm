import { suite, test, expect } from "vitest";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

suite("parseChar", () => {
	test("too long", () => {
		expect(() => parseChar("too long")).toThrow();
	});
});

testExamples("parseChar", [
	{
		name: "no match",
		parser: parseChar("a"),
		input: "b",
		result: undefined,
	},
	{
		name: "match",
		parser: parseChar("a"),
		input: "a",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
	{
		name: "match 2nd",
		parser: parseChar("a"),
		input: "ba",
		fromIndex: 1,
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
]);
