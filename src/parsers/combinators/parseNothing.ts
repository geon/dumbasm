import { createParseResult, type Parser } from "./Parser";

export const parseNothing =
	<T>(parsed: T): Parser<T> =>
	(_, fromIndex) =>
		createParseResult(fromIndex, parsed);
