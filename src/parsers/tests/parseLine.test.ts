import { parseAsmLine } from "../parseAsmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseAsmLine", [
	{
		input: "nonsense",
		parser: parseAsmLine,
		result: undefined,
	},
	{
		name: "empty line",
		input: "",
		parser: parseAsmLine,
		result: {
			consumed: 0,
			parsed: {
				label: undefined,
				directive: undefined,
				instruction: undefined,
				originalSource: "",
			},
		},
	},
	{
		input: "loop: lda $12ab,X ; Copy char byte",
		parser: parseAsmLine,
		result: {
			consumed: 34,
			parsed: {
				label: "loop",
				directive: undefined,
				instruction: {
					mnemonic: "lda",
					addressingMode: "absolute,X",
					operand: { type: "number", number: { format: "hex", value: 0x12ab } },
				},
				originalSource: "loop: lda $12ab,X ; Copy char byte",
			},
		},
	},
]);
