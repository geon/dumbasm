import type { AsmFragment } from "./parsers/parseAsmLine.js";
import type { DumbasmFragment } from "./parsers/parseDumbasmLine.js";

export function lowerDumdasm(
	fragments: readonly (AsmFragment | DumbasmFragment)[],
): readonly AsmFragment[] {
	return fragments.map((fragment) => {
		if (fragment.type === "variableDeclaration") {
			throw new Error("Not implemented.");
		}

		return fragment;
	});
}
