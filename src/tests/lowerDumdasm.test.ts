import { suite, test, expect, assert } from "vitest";
import { parseFile } from "../parsers/parseFile.js";
import {
	parsingFailed,
	type ParseError,
} from "../parsers/combinators/Parser.js";
import { lowerDumdasm } from "../lowerDumdasm.js";
import { getLineCol } from "../fp/lineNumber.js";
import { asmSamples } from "../parsers/tests/asm-samples.js";
import { dumbasmSamples } from "./dumbasm-samples.js";

testExamples("lowerDumdasm", [
	{
		name: "plain asm",
		input: `
			lda myLabel
		`,
		result: `
			lda myLabel
		`,
	},
	{
		name: "unused variable",
		input: `
			uint8 myVariable
			lda myLabel
		`,
		result: `
			lda myLabel
		`,
	},
	{
		name: "conflicting variable name",
		input: `
			uint8 myVariable
			uint8 myVariable
		`,
		result: undefined,
	},
	{
		name: "sta inA",
		input: `
			regA uint8 inA
			sta inA
		`,
		result: "",
	},
	{
		name: "sta inX ",
		input: `
			regX uint8 inX
			sta inX
		`,
		result: `
			tax
		`,
	},
	{
		name: "conflicting variable register location",
		input: `
			regA uint8 foo
			regA uint8 bar
		`,
		result: undefined,
	},
	{
		name: "scope",
		input: `
			{
				regA uint8 foo
			}
			{
				regA uint8 foo
			}
		`,
		result: "",
	},
	{
		name: "variables sample",
		input: dumbasmSamples.helloWorldWithVariablesOnly,
		result: asmSamples.helloWorld,
	},
]);

export type Example = Readonly<{
	name: string;
	input: string;
	result: string | undefined;
}>;

export function testExamples(suiteName: string, examples: Readonly<Example[]>) {
	suite(suiteName, () => {
		for (const example of examples) {
			test(example.name, () => {
				const parsedInput = parseFile(example.input, 0);
				if (parsingFailed(parsedInput)) {
					assert.fail(formatError(parsedInput, example.input));
				}

				const parsedResult =
					example.result === undefined
						? undefined
						: parseFile(example.result, 0);
				if (parsedResult && parsingFailed(parsedResult)) {
					assert.fail(formatError(parsedResult, example.result!));
				}

				expect(lowerDumdasm(parsedInput.parsed)).toStrictEqual(
					parsedResult?.parsed,
				);
			});
		}
	});
}

function formatError(parsed: ParseError, input: string): string {
	const { lineBeginIndex, lineEndIndex, columnNumber, lineNumber } = getLineCol(
		input,
		parsed.fromIndex,
	);

	const line = input.slice(lineBeginIndex, lineEndIndex);
	const columnIndex = columnNumber - 1;
	const arrow =
		Array.from(
			{
				length: columnIndex,
			},
			(_, index) => (line[index] === "\t" ? "\t" : " "),
		).join("") + "^";

	return `Parse Error on line ${lineNumber}:${columnNumber}\n${parsed.message}\n${line}\n${arrow}`;
}
