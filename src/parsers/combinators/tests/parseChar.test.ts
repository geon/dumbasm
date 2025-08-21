import { suite, test, expect } from "vitest";
import { parseChar, parseCharCaseInsensitive } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

suite("parseChar", () => {
	test("too long", () => {
		expect(() => parseChar("too long")).toThrow();
	});
});

testExamples("parseChar", [
	{
		name: "no match",
		parser: parseChar("b"),
		input: "abc",
		result: undefined,
	},
	{
		name: "match",
		parser: parseChar("a"),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "a",
		},
	},
	{
		name: "case insensitive",
		parser: parseCharCaseInsensitive("A"),
		input: "abc",
		result: {
			consumed: 1,
			parsed: "A",
		},
	},
]);
