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
]);
