import { parseFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseFile", [
	{
		// https://github.com/jawuku/hello-world/blob/master/c64-helloworld.asm
		name: "hello world",
		input: `
			.export Start

			Start:
					ldy #0
			loop:   lda message,Y
					jsr $ffd2
					iny
					cpy #14
					bne loop
					rts
					
			message: .byte 147 
					.text "hello world"
					.byte 13
					.byte 10
		`,
		parser: parseFile,
		result: {
			consumed: 210,
			parsed: [
				{
					comment: undefined,
					directive: undefined,
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: ".export Start",
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: undefined,
					label: "Start",
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "immediate",
						mnemonic: "ldy",
						operand: {
							number: {
								format: "dec",
								value: 0,
							},
							type: "number",
						},
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "absolute,Y",
						mnemonic: "lda",
						operand: {
							identifier: "message",
							type: "identifier",
						},
					},
					label: "loop",
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "absolute",
						mnemonic: "jsr",
						operand: {
							number: {
								format: "hex",
								value: 65490,
							},
							type: "number",
						},
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "implied",
						mnemonic: "iny",
						operand: undefined,
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "immediate",
						mnemonic: "cpy",
						operand: {
							number: {
								format: "dec",
								value: 14,
							},
							type: "number",
						},
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "relative",
						mnemonic: "bne",
						operand: {
							identifier: "loop",
							type: "identifier",
						},
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: {
						addressingMode: "implied",
						mnemonic: "rts",
						operand: undefined,
					},
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: ".byte 147 ",
					instruction: undefined,
					label: "message",
				},
				{
					comment: undefined,
					directive: '.text "hello world"',
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: ".byte 13",
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: ".byte 10",
					instruction: undefined,
					label: undefined,
				},
				{
					comment: undefined,
					directive: undefined,
					instruction: undefined,
					label: undefined,
				},
			],
		},
	},
]);
