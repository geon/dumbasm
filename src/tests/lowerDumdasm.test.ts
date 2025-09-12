import { suite, test, expect, assert } from "vitest";
import { parseFile } from "../parsers/parseFile.js";
import {
	parsingFailed,
	type ParseError,
} from "../parsers/combinators/Parser.js";
import { lowerDumdasm } from "../lowerDumdasm.js";
import { getLineCol } from "../fp/lineNumber.js";

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
