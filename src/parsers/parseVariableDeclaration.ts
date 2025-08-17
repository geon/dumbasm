import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseOptional } from "./combinators/parseOptional.js";
import type { Parser } from "./combinators/Parser.js";
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
	name: string;
}>;

export const parseVariableDeclaration: Parser<ParsedVariableDeclaration> =
	parseMonad(
		parseSequence([
			parseOptional(
				parseSequence([parseVariableLocation, parseOneOrMore(parseWhitespace)]),
			),
			parseType,
			parseOneOrMore(parseWhitespace),
			parseIdentifier,
		]),
		([loc, type, , name]): ParsedVariableDeclaration => {
			return {
				type,
				location: loc?.[0],
				name,
			};
		},
	);
