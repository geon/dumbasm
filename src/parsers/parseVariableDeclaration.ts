import { parseLineNumber } from "./combinators/parseLineNumber.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseType, type Type } from "./parseType.js";
import type { VariableLocation } from "./parseVariableLocation.js";

export type ParsedVariableDeclaration = Readonly<{
	type: Type;
	location: VariableLocation | undefined;
	lineNum: number;
	name: string;
}>;

export const parseVariableDeclaration = parseMonad(
	parseSequence([
		//
		parseLineNumber,
		parseType,
		parseWhitespace,
		parseIdentifier,
	]),
	([meta, type, , name], { result }) => {
		return result<ParsedVariableDeclaration>({
			type,
			location: undefined,
			lineNum: meta.lineNumber,
			name,
		});
	},
);
