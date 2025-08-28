import { expect, suite, test } from "vitest";
import type { Parser, ParseResult } from "../Parser.js";

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
				expect(
					example.parser(example.input, example.fromIndex ?? 0),
				).toStrictEqual(example.result);
			});
		}
	});
}
