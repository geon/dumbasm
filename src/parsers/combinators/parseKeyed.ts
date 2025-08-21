import type { Parser } from "./Parser.js";

export function parseKeyed<TParsers extends Record<string, Parser<unknown>>>(
	parsers: TParsers,
): Parser<
	{
		[Key in keyof TParsers]: readonly [
			Key,
			TParsers[Key] extends Parser<infer P> ? P : never,
		];
	}[keyof TParsers]
> {
	return (input, fromIndex) => {
		for (const [key, parser] of Object.entries(parsers)) {
			const parsed = parser(input, fromIndex);
			if (parsed) {
				return {
					consumed: parsed.consumed,
					parsed: [key, parsed.parsed] as {
						[Key in keyof TParsers]: readonly [
							Key,
							TParsers[Key] extends Parser<infer P> ? P : never,
						];
					}[keyof TParsers],
				};
			}
		}

		return undefined;
	};
}
