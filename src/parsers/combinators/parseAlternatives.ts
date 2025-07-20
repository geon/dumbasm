import type { Parser } from "./Parser.js";

export function parseAlternatives<TParsers extends readonly Parser<unknown>[]>(
	parsers: TParsers,
): Parser<Exclude<ReturnType<TParsers[number]>, undefined>["parsed"]> {
	return (input, fromIndex) => {
		for (const parser of parsers) {
			const parsed = parser(input, fromIndex);
			if (parsed) {
				return parsed;
			}
		}

		return undefined;
	};
}
