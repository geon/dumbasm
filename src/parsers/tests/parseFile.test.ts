import { parseFile, type ParsedFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import {
	createParseError,
	createParseResult,
	parsingFailed,
} from "../combinators/Parser.js";
import { suite, test, expect } from "vitest";
import { asmSamples } from "./asm-samples.js";

testExamples<ParsedFile>("parseFile", [
	{
		input: "nonsense",
		parser: parseFile,
		result: createParseError(0, "SYNTAX ERROR"),
	},
	{
		name: "empty",
		input: "",
		parser: parseFile,
		result: createParseResult(0, []),
	},
	{
		input: "inc",
		parser: parseFile,
		result: createParseResult(3, [
			{
				type: "instruction",
				value: {
					mnemonic: "inc",
					operand: undefined,
				},
			},
		]),
	},
	{
		name: "\\ninc\\ntax\\n\\n",
		input: "\ninc\ntax\n\n",
		parser: parseFile,
		result: createParseResult(10, [
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
		]),
	},
	{
		name: "tax \\n then nonsense",
		input: "tax \n then nonsense",
		parser: parseFile,
		result: createParseError(6, "SYNTAX ERROR"),
	},
]);

suite("parseFile", () => {
	test("hello world", () => {
		const parsed = parseFile(asmSamples.helloWorld, 0);
		expect(parsingFailed(parsed)).toBe(false);
		expect(parsed).toMatchSnapshot();
	});
});
