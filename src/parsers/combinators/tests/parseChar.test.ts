import { suite, test, expect } from "vitest";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";
import { createParseError } from "../Parser.js";

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
		result: createParseError(0, 'Expected char "b".'),
	},
]);
