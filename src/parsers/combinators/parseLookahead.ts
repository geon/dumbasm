import { failParsing, parsingFailed, type Parser } from "./Parser.js";

export const parseLookahead =
	<T>(parser: Parser<T>): Parser<T> =>
	(...args) => {
		const parsed = parser(...args);
		return parsingFailed(parsed)
			? failParsing()
			: {
					consumed: 0,
					parsed: parsed.parsed,
				};
	};
