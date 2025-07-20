import { parseLine } from "../parseLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseLine", [
	{
		input: "nonsense",
		parser: parseLine,
		result: undefined,
	},
	{
		name: "empty line",
		input: "",
		parser: parseLine,
		result: {
			consumed: 0,
			parsed: {
				label: undefined,
				directive: undefined,
				instruction: undefined,
				comment: undefined,
			},
		},
	},
	{
		input: "loop: lda $12ab,X ; Copy char byte",
		parser: parseLine,
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
				comment: " Copy char byte",
			},
		},
	},
]);
