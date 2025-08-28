import { parseAlternatives } from "./parseAlternatives.js";
import { parseChar } from "./parseChar.js";
import type { Parser } from "./Parser.js";

const alphas = [
	[...Array(26)].map((_, x) => [
		String.fromCharCode("a".charCodeAt(0) + x),
		String.fromCharCode("A".charCodeAt(0) + x),
	]),
].flat();

export const parseAlpha: Parser<string> = parseAlternatives(
	alphas.flat().map(parseChar),
);
