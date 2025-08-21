import type { Parser } from "./Parser.js";

export const parseLookahead =
	(parser: Parser<unknown>): Parser<undefined> =>
	(...args) => {
		return (
			parser(...args) && {
				consumed: 0,
				parsed: undefined,
			}
		);
	};
