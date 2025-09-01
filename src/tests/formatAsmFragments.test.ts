import { suite, test, expect, assert } from "vitest";
import { formatAsmFragments } from "../formatAsmFragments";
import { parseFile } from "../parsers/parseFile";
import { parsingFailed, type ParseError } from "../parsers/combinators/Parser";
import { asmSamples } from "../parsers/tests/asm-samples";
import { getLineCol } from "../fp/lineNumber";

testExamples("formatAsmFragments", [
	{
		name: "hello world",
		input: asmSamples.helloWorld,
	},
	{
		name: "missing modes",
		input: asmSamples.addressingModesMissingInHelloWorld,
	},
]);

export function testExamples(
	suiteName: string,
	examples: readonly {
		readonly name: string;
		readonly input: string;
	}[],
) {
	suite(suiteName, () => {
		for (const example of examples) {
			test(example.name, () => {
				const parsed = parseFile(example.input, 0);

				if (parsingFailed(parsed)) {
					assert.fail(formatError(parsed, example.input));
				} else {
					const asmFragments = parsed.parsed.map((fragment) => {
						if (
							fragment.type === "variableDeclaration" ||
							fragment.type === "scope"
						) {
							throw new Error("Not implemented.");
						}
						return fragment;
					});

					expect(formatAsmFragments(asmFragments)).toMatchSnapshot();
				}
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
