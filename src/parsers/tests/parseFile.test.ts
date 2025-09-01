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
		input: "tax",
		parser: parseFile,
		result: createParseResult(3, [
			{
				type: "instruction",
				value: {
					mnemonic: "tax",
					addressingMode: {
						type: "implied",
						value: undefined,
					},
				},
			},
		]),
	},
	{
		name: "\\niny\\ntax\\n\\n",
		input: "\niny\ntax\n\n",
		parser: parseFile,
		result: createParseResult(10, [
			{
				type: "instruction",
				value: {
					mnemonic: "iny",
					addressingMode: {
						type: "implied",
						value: undefined,
					},
				},
			},
			{
				type: "instruction",
				value: {
					mnemonic: "tax",
					addressingMode: {
						type: "implied",
						value: undefined,
					},
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
	{
		name: "variable",
		input: "uint8 myVariable",
		parser: parseFile,
		result: createParseResult(16, [
			{
				type: "variableDeclaration",
				value: {
					lineNum: 1,
					location: undefined,
					name: "myVariable",
					type: "uint8",
				},
			},
		]),
	},
	{
		name: "scope",
		input: "{}",
		parser: parseFile,
		result: createParseResult(2, [
			{
				type: "scope",
				value: [],
			},
		]),
	},
]);

suite("parseFile", () => {
	test("hello world", () => {
		const parsed = parseFile(asmSamples.helloWorld, 0);
		expect(parsingFailed(parsed)).toBe(false);
		expect(parsed).toMatchSnapshot();
	});

	// test("ca65 syntax", () => {
	// 	const parsed = parseFile(asmSamples.ca65Syntax, 0);
	// 	expect(parsingFailed(parsed)).toBe(false);
	// 	expect(parsed).toMatchSnapshot();
	// });
});
