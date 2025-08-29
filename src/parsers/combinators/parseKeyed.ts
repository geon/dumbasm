import { failParsing, parsingFailed, type Parser } from "./Parser.js";

type KeyedParsers = Record<string, Parser<unknown>>;

type KeyedResult<TParsers extends KeyedParsers> = {
	[Key in keyof TParsers]: {
		readonly type: Key;
		readonly value: TParsers[Key] extends Parser<infer P> ? P : never;
	};
}[keyof TParsers];

export function parseKeyed<TParsers extends KeyedParsers>(
	parsers: TParsers,
): Parser<KeyedResult<TParsers>> {
	return (input, fromIndex) => {
		for (const [key, parser] of Object.entries(parsers)) {
			const parsed = parser(input, fromIndex);
			if (!parsingFailed(parsed)) {
				return {
					consumed: parsed.consumed,
					parsed: {
						type: key,
						value: parsed.parsed,
					} as KeyedResult<TParsers>,
				};
			}
		}

		return failParsing();
	};
}
