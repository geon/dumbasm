import type { AsmFragment } from "./parsers/parseAsmLine";
import type {
	Operand,
	ParsedMos6502AddressingMode,
} from "./parsers/parseMos6502AddressingMode";
import type { ParsedMos6502Instruction } from "./parsers/parseMos6502Instruction";

export function formatAsmFragments(fragments: readonly AsmFragment[]): string {
	return fragments.map(formatAsmFragment).join("\n");
}

function formatAsmFragment(fragment: AsmFragment): string {
	switch (fragment.type) {
		case "label": {
			return fragment.value + ":";
		}

		case "directive": {
			return fragment.value;
		}

		case "instruction": {
			return formatInstruction(fragment.value);
		}

		default: {
			throw new Error(fragment satisfies never);
		}
	}
}

function formatInstruction(instruction: ParsedMos6502Instruction): string {
	return !instruction.operand
		? instruction.mnemonic
		: instruction.mnemonic + " " + formatAddressingMode(instruction.operand);
}

function formatAddressingMode(operand: ParsedMos6502AddressingMode): string {
	switch (operand.type) {
		case "immediate": {
			return `#${formatNumber(operand.value)}`;
		}

		case "preIndexedIndirect": {
			return `(${formatOperand(operand.value)},X)`;
		}

		case "postIndexedIndirect": {
			return `(${formatOperand(operand.value)}),Y`;
		}

		case "indirect": {
			return `(${formatOperand(operand.value)})`;
		}

		case "indexed": {
			return `${formatOperand(operand.value.operand)},${operand.value.index}`;
		}

		case "accumulator": {
			return `A`;
		}

		case "address": {
			return `${formatOperand(operand.value)}`;
		}

		default: {
			throw new Error(operand satisfies never);
		}
	}
}

function formatOperand(operand: Operand): string {
	switch (operand.type) {
		case "number": {
			return formatNumber(operand.value);
		}

		case "identifier": {
			return operand.value;
		}

		default: {
			throw new Error(operand satisfies never);
		}
	}
}

function formatNumber(number: number): string {
	return `$${number.toString(16)}`;
}
