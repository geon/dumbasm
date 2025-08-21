import { parseEof } from "./combinators/parseEof.js";
import { parseEol } from "./combinators/parseEol.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseMonad } from "./combinators/parseMonad.js";
import { parseOneOrMore } from "./combinators/parseOneOrMore.js";
import { parseSequence } from "./combinators/parseSequence.js";
import { parseAsmLine } from "./parseAsmLine.js";
import { parseVariableDeclaration } from "./parseVariableDeclaration.js";

export const parseFile = parseSequence([
	parseOneOrMore(
		parseMonad(
			parseSequence([
				parseKeyed({
					dumbasm: parseVariableDeclaration,
					asm: parseAsmLine,
				}),
				parseEol,
			]),
			([asmOrDumbasm]) => {
				return asmOrDumbasm;
			},
		),
	),
	parseEof,
]);
