import type { AsmFragment } from "./parsers/parseAsmLine";
import type { Operand } from "./parsers/addressingModeCategoryParsers";
import type {
	GetAddressingModeCategory,
	ParsedAddressingModeCategory,
	ParsedMos6502Instruction,
} from "./parsers/parseMos6502Instruction";
import type { Mos6502AddressingMode } from "./mos6502Instructions";

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

		// Exclude this case from code coverage, since it is only for type safety.
		/* v8 ignore next 3 */
		default: {
			throw new Error(fragment satisfies never);
		}
	}
}

function formatInstruction(instruction: ParsedMos6502Instruction): string {
	return instruction.addressingMode.type === "implied"
		? instruction.mnemonic
		: instruction.mnemonic +
				" " +
				formatAddressingMode(instruction.addressingMode);
}

function formatAddressingMode(
	operand: ParsedAddressingModeCategory<
		Exclude<GetAddressingModeCategory<Mos6502AddressingMode>, "implied">
	>,
): string {
	switch (operand.type) {
		case "immediate": {
			return `#${formatNumber(operand.value)}`;
		}

		case "preIndexedIndirect": {
			return `(${formatOperand(operand.value.operand)},X)`;
		}

		case "postIndexedIndirect": {
			return `(${formatOperand(operand.value.operand)}),Y`;
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

		// Exclude this case from code coverage, since it is only for type safety.
		/* v8 ignore next 3 */
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

		// Exclude this case from code coverage, since it is only for type safety.
		/* v8 ignore next 3 */
		default: {
			throw new Error(operand satisfies never);
		}
	}
}

function formatNumber(number: number): string {
	return `$${number.toString(16)}`;
}
