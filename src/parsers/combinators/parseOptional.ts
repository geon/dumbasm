import { parsingFailed, type Parser } from "./Parser.js";

export function parseOptional<T>(parser: Parser<T>): Parser<T | undefined> {
	return (...args) => {
		const parsed = parser(...args);
		return parsingFailed(parsed)
			? {
					type: "success",
					consumed: 0,
					parsed: undefined,
				}
			: parsed;
	};
}
