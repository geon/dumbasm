import type { Parser } from "./combinators/Parser.js";
import { parseLine, type ParsedLine } from "./parseLine.js";

export type ParsedFile = readonly (ParsedLine | undefined)[];

export const parseFile: Parser<ParsedFile> = (input, fromIndex) => {
	const lines = input.slice(fromIndex).split("\n");

	const parsed = lines.map((line) => parseLine(line, 0)?.parsed);

	return {
		consumed: input.length - fromIndex,
		parsed,
	};
};
