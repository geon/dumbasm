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

	const allocatedRegisters = new Set<RegisterName>();

	for (const [name, variable] of Object.entries(variables)) {
		if (variable.location === "zeroPage" || variable.location === undefined) {
			allocations[name] = { type: "address", address: 1234 };
		} else {
			const registerName = variable.location[3] as RegisterName;

			if (allocatedRegisters.has(registerName)) {
				return undefined;
			}
			allocatedRegisters.add(registerName);

			allocations[name] = {
				type: "reg",
				reg: registerName,
			};
		}
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

	if (fragment.type === "variableLoad") {
		return lowerVariableLoad(fragment, variables);
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
		return lowerStaToVariable(
			variables[fragment.value.addressingMode.value.value]!,
		);
	}

	return fragment;
}

function lowerStaToVariable(
	variable: VariableAllocation,
): AsmFragment | undefined {
	switch (variable.type) {
		case "reg": {
			switch (variable.reg) {
				case "A": {
					return undefined;
				}

				case "X": {
					return {
						type: "instruction",
						value: {
							mnemonic: "tax",
							addressingMode: { type: "implied", value: undefined },
						},
					};
				}

				case "Y": {
					return {
						type: "instruction",
						value: {
							mnemonic: "tay",
							addressingMode: { type: "implied", value: undefined },
						},
					};
				}

				default: {
					return variable.reg satisfies never;
				}
			}
		}

		case "address": {
			throw new Error("Not implemented.");
		}

		default: {
			return variable satisfies never;
		}
	}
}

function lowerVariableLoad(
	fragment: Extract<DumbasmFragment, { type: "variableLoad" }>,
	variables: VariableAllocations,
): AsmFragment[] {
	const variable = variables[fragment.value.variable];
	if (!variable) {
		throw new Error("Unknown variable: " + fragment.value.variable);
	}

	if (fragment.value.addressingMode.type === "immediate") {
		if (variable.type === "reg") {
			return [
				{
					type: "instruction",
					value: {
						mnemonic: (
							{
								A: "lda",
								X: "ldx",
								Y: "ldy",
							} as const
						)[variable.reg],
						addressingMode: {
							type: "immediate",
							value: fragment.value.addressingMode.value,
						},
					},
				},
			];
		}
	}

	if (fragment.value.addressingMode.type === "indexed") {
		const source = variables[fragment.value.addressingMode.value.index];
		if (!source) {
			throw new Error(
				"Unknown variable: " + fragment.value.addressingMode.value.index,
			);
		}

		if (variable.type === "reg" && source.type === "reg") {
			if (variable.reg === source.reg) {
				return [];
			}

			if (source.reg === "A") {
				if (variable.reg === "X") {
					return [
						{
							type: "instruction",
							value: {
								mnemonic: "tax",
								addressingMode: {
									type: "implied",
									value: undefined,
								},
							},
						},
					];
				}
			}
		}

		if (
			variable.type === "reg" &&
			variable.reg === "A" &&
			source.type === "address"
		) {
			source.address;
		}
	}

	return [];
}
