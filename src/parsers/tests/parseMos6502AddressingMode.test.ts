import { testExamples } from "../combinators/tests/testExamples.js";
import { mos6502AddressingModeParsers } from "../parseMos6502AddressingMode.js";

testExamples("parseMos6502AddressingMode", [
	{
		input: "A",
		parser: mos6502AddressingModeParsers["accumulator"],
		result: {
			consumed: 1,
			parsed: {
				addressingMode: "accumulator",
				operand: undefined,
			},
		},
	},
	{
		input: "#123",
		parser: mos6502AddressingModeParsers["immediate"],
		result: {
			consumed: 4,
			parsed: {
				addressingMode: "immediate",
				operand: { type: "number", number: { format: "dec", value: 123 } },
			},
		},
	},
	{
		input: "$ff",
		parser: mos6502AddressingModeParsers["zeropage"],
		result: {
			consumed: 3,
			parsed: {
				addressingMode: "zeropage",
				operand: { type: "number", number: { format: "hex", value: 0xff } },
			},
		},
	},
	{
		input: "$ffff",
		parser: mos6502AddressingModeParsers["zeropage"],
		result: undefined,
	},
	{
		input: "$abcd,X",
		parser: mos6502AddressingModeParsers["absolute,X"],
		result: {
			consumed: 7,
			parsed: {
				addressingMode: "absolute,X",
				operand: { type: "number", number: { format: "hex", value: 0xabcd } },
			},
		},
	},
	{
		input: "$ffff,X",
		parser: mos6502AddressingModeParsers["zeropage,X"],
		result: undefined,
	},
	{
		input: "$abcd",
		parser: mos6502AddressingModeParsers["indirect"],
		result: {
			consumed: 5,
			parsed: {
				addressingMode: "indirect",
				operand: { type: "number", number: { format: "hex", value: 0xabcd } },
			},
		},
	},
	{
		input: "($abcd,X)",
		parser: mos6502AddressingModeParsers["(indirect,X)"],
		result: {
			consumed: 9,
			parsed: {
				addressingMode: "(indirect,X)",
				operand: { type: "number", number: { format: "hex", value: 0xabcd } },
			},
		},
	},
	{
		input: "($abcd),Y",
		parser: mos6502AddressingModeParsers["(indirect),Y"],
		result: {
			consumed: 9,
			parsed: {
				addressingMode: "(indirect),Y",
				operand: { type: "number", number: { format: "hex", value: 0xabcd } },
			},
		},
	},
	{
		input: "identifier",
		parser: mos6502AddressingModeParsers["zeropage"],
		result: {
			consumed: 10,
			parsed: {
				addressingMode: "zeropage",
				operand: { type: "identifier", identifier: "identifier" },
			},
		},
	},
]);
