import { assert, expect, suite, test } from "vitest";
import {
	parsingFailed,
	type ParseFailure,
	type Parser,
	type ParseResult,
} from "../Parser.js";

export type Example<T> = Readonly<{
	name: string;
	parser: Parser<T>;
	input: string;
	fromIndex?: number;
	result: ParseResult<T>;
}>;

export function testExamples<T>(
	suiteName: string,
	examples: Readonly<Example<T>[]>,
) {
	suite(suiteName, () => {
		for (const example of examples) {
			test(example.name, () => {
				const parsed = example.parser(example.input, example.fromIndex ?? 0);

				if (parsingFailed(parsed) && example.result.type !== "error") {
					assert.fail(formatError(parsed, example.input));
				} else {
					expect(parsed).toStrictEqual(example.result);
				}
			});
		}
	});
}

function formatError(parsed: ParseFailure, input: string): string {
	const lineBeginIndex =
		fixMissing(input.lastIndexOf("\n", parsed.fromIndex)) ?? 0;
	const lineEndIndex = fixMissing(input.indexOf("\n", parsed.fromIndex));
	const lineNumber = countOccurenceOfChar("\n", input, parsed.fromIndex) + 1;
	const lineNumberTitle = `line ${lineNumber} | `;
	const line = input.slice(lineBeginIndex, lineEndIndex);
	const arrow =
		Array.from(
			{
				length:
					lineNumberTitle.length + 1 + (parsed.fromIndex - lineBeginIndex),
			},
			() => " ",
		).join("") + "^";

	return `Parse Error:\n${parsed.message}\n${lineNumberTitle} ${line}\n${arrow}`;
}

function fixMissing(index: number): number | undefined {
	return index === -1 ? undefined : index;
}

function countOccurenceOfChar(
	char: string,
	input: string,
	toIndex: number,
): number {
	return input.slice(toIndex).split(char).length - 1;
}
