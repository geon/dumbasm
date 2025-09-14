import type { AsmFragment } from "./parsers/parseAsmLine.js";
import type { DumbasmFragment } from "./parsers/parseDumbasmLine.js";
import type { ParsedFile } from "./parsers/parseFile.js";
import type { VariableLocation } from "./parsers/parseVariableLocation.js";

type RegisterName = "A" | "X" | "Y";
type VariableAllocation =
	| { type: "reg"; reg: RegisterName }
	| { type: "address"; address: number };
type VariableAllocations = Record<string, VariableAllocation>;

function allocateVariables(
	fragments: ParsedFile,
): VariableAllocations | undefined {
	const variables: Record<
		string,
		{
			readonly lineNum: number;
			readonly location: VariableLocation | undefined;
		}
	> = {};

	for (const fragment of fragments) {
		if (fragment.type === "variableDeclaration") {
			if (variables[fragment.value.name]) {
				return undefined;
			}
			variables[fragment.value.name] = {
				lineNum: fragment.value.lineNum,
				location: fragment.value.location,
			};
			continue;
		}
	}

	const allocations: Record<string, VariableAllocation> = {};

	for (const [name, variable] of Object.entries(variables)) {
		allocations[name] =
			variable.location === "zeroPage" || variable.location === undefined
				? { type: "address", address: 1234 }
				: {
						type: "reg",
						reg: variable.location[3] as RegisterName,
					};
	}

	return allocations;
}

export function lowerDumdasm(
	fragments: ParsedFile,
): readonly AsmFragment[] | undefined {
	const variables = allocateVariables(fragments);
	if (!variables) {
		return undefined;
	}

	const result: AsmFragment[] = [];

	for (const fragment of fragments) {
		if (fragment.type === "variableDeclaration" || fragment.type === "scope") {
			continue;
		}

		result.push(...lowerDumbasmFragment(fragment, variables));
	}

	return result;
}

function lowerDumbasmFragment(
	fragment:
		| AsmFragment
		| DumbasmFragment
		| { readonly type: "scope"; readonly value: ParsedFile },
	variables: VariableAllocations,
): readonly AsmFragment[] {
	if (fragment.type === "variableDeclaration" || fragment.type === "scope") {
		throw new Error("Not implemented.");
	}

	if (fragment.type === "instruction") {
		if (fragment.value.mnemonic === "sta") {
			const newFragment = lowerSta(fragment, variables);
			return newFragment ? [newFragment] : [];
		}
	}

	return [fragment];
}

function lowerSta(
	fragment: Extract<AsmFragment, { type: "instruction" }>,
	variables: VariableAllocations,
): AsmFragment | undefined {
	if (
		fragment.value.addressingMode?.type === "address" &&
		fragment.value.addressingMode.value.type === "identifier" &&
		variables[fragment.value.addressingMode.value.value]
	) {
		return undefined;
	}

	return fragment;
}
