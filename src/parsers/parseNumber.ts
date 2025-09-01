import { createParseError, type Parser } from "./combinators/Parser.js";

export const parseNumber: Parser<number> = (_, fromIndex) =>
	createParseError(fromIndex, "Expected a number.");
