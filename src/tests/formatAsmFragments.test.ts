import { suite, test, expect } from "vitest";
import { formatAsmFragments } from "../formatAsmFragments";
import { parseFile } from "../parsers/parseFile";
import { parsingFailed } from "../parsers/combinators/Parser";
import { asmSamples } from "../parsers/tests/asm-samples";
import { lowerDumdasm } from "../lowerDumdasm";

suite("formatAsmFragments", () => {
	test("helloWorld", () => {
		const parsed = parseFile(asmSamples.helloWorld, 0);
		if (parsingFailed(parsed)) {
			throw new Error("Parsing failed.");
		}
		expect(formatAsmFragments(lowerDumdasm(parsed.parsed))).toMatchSnapshot();
	});
});
