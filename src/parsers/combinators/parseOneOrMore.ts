import type { Parser } from "./Parser.js";

export function parseOneOrMore<T>(parser: Parser<T>): Parser<readonly T[]> {
	return (input, fromIndex) => {
		let consumed = 0;
		const parsed = [];
		for (;;) {
			const parseResult = parser(input, fromIndex + consumed);
			if (!parseResult) {
				break;
			}
			consumed += parseResult.consumed;
			parsed.push(parseResult.parsed);
			if (!parseResult.consumed) {
				break;
			}
		}

		if (parsed.length === 0) {
			return undefined;
		}

		return {
			consumed,
			parsed,
		};
	};
}
