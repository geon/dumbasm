import { suite, test, expect } from "vitest";
import { formatAsmFragments } from "../formatAsmFragments";
import { parseFile } from "../parsers/parseFile";
import { parsingFailed } from "../parsers/combinators/Parser";
import { asmSamples } from "../parsers/tests/asm-samples";

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

function parse(fileContents: string) {
	const parsed = parseFile(fileContents, 0);
	if (parsingFailed(parsed)) {
		throw new Error("Parsing failed.");
	}

	const asmFragments = parsed.parsed.map((fragment) => {
		if (fragment.type === "variableDeclaration") {
			throw new Error("Not implemented.");
		}
		return fragment;
	});

	return asmFragments;
}

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
				expect(formatAsmFragments(parse(example.input))).toMatchSnapshot();
			});
		}
	});
}
