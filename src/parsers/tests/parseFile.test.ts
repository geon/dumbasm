import { parseFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { asmSamples } from "./asm-samples.js";
import { suite, test, expect } from "vitest";
import { parsingFailed } from "../combinators/Parser.js";

testExamples("parseFile", [
	{
		name: "instruction",
		input: "inc",
		parser: parseFile,
		result: {
			consumed: 3,
			parsed: [
				{
					type: "instruction",
					value: {
						mnemonic: "inc",
						operand: undefined,
					},
				},
			],
		},
	},
	{
		name: "newline",
		input: "\n",
		parser: parseFile,
		result: {
			consumed: 1,
			parsed: [],
		},
	},
	{
		name: "instruction x 2",
		input: "inc\ntax",
		parser: parseFile,
		result: {
			consumed: 7,
			parsed: [
				{
					type: "instruction",
					value: {
						mnemonic: "inc",
						operand: undefined,
					},
				},
				{
					type: "instruction",
					value: {
						mnemonic: "tax",
						operand: undefined,
					},
				},
			],
		},
	},
]);

suite("parseFile", () => {
	test("helloWorld", () => {
		const parsed = parseFile(asmSamples.helloWorld, 0);
		expect(parsingFailed(parsed)).toBe(false);
		expect(parsed).toMatchSnapshot();
	});
});
