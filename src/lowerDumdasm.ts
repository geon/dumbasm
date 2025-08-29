import type { AsmFragment } from "./parsers/parseAsmLine.js";
import type { DumbasmFragment } from "./parsers/parseDumbasmLine.js";
import type { ParsedFile } from "./parsers/parseFile.js";

export function lowerDumdasm(
	fragments: ParsedFile,
): readonly AsmFragment[] | undefined {
	const result: AsmFragment[] = [];

	for (const fragment of fragments) {
		if (fragment.type === "variableDeclaration" || fragment.type === "scope") {
			continue;
		}

		result.push(...lowerDumbasmFragment(fragment));
	}

	return result;
}

function lowerDumbasmFragment(
	fragment:
		| AsmFragment
		| DumbasmFragment
		| { readonly type: "scope"; readonly value: ParsedFile },
): readonly AsmFragment[] {
	if (fragment.type === "variableDeclaration" || fragment.type === "scope") {
		throw new Error("Not implemented.");
	}

	return [fragment];
}
