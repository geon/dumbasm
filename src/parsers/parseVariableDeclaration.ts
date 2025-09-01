import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseIdentifier } from "./parseIdentifier.js";
import { parseType, type Type } from "./parseType.js";
import type { VariableLocation } from "./parseVariableLocation.js";

export type ParsedVariableDeclaration = Readonly<{
	type: Type;
	location: VariableLocation | undefined;
	name: string;
}>;

export const parseVariableDeclaration: Parser<ParsedVariableDeclaration> =
	parseMonad(
		parseSequence([parseType, parseWhitespace, parseIdentifier]),
		([type, , name], { result }) => {
			return result({
				type,
				location: undefined,
				name,
			});
		},
	);
