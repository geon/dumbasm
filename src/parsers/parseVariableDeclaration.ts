import { parseLineNumber } from "./combinators/parseLineNumber.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseType, type Type } from "./parseType.js";
import {
	parseVariableLocation,
	type VariableLocation,
} from "./parseVariableLocation.js";

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
		parseOptional(parseSequence([parseVariableLocation, parseWhitespace])),
		parseType,
		parseWhitespace,
		parseIdentifier,
	]),
	([meta, loc, type, , name], { result }) => {
		return result<ParsedVariableDeclaration>({
			type,
			location: loc?.[0],
			lineNum: meta.lineNumber,
			name,
		});
	},
);
