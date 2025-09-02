import { parseAsmLine } from "../parseAsmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError } from "../combinators/Parser.js";

testExamples("parseAsmLine", [
	{
		name: "empty line",
		input: "",
		parser: parseAsmLine,
		result: createParseError(0, "Expected asm code line."),
	},
]);
