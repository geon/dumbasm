import type { Parser } from "./Parser.js";

export function parseMonad<T, T2>(
	parser: Parser<T>,
	transform: (parsed: T, unparsed: string) => T2,
): Parser<Exclude<T2, undefined>> {
	return (input, fromIndex) => {
		const parsed = parser(input, fromIndex);
		if (!parsed) {
			return undefined;
		}

		const transformed = transform(
			parsed.parsed,
			input.slice(fromIndex, fromIndex + parsed.consumed),
		);
		if (transformed === undefined) {
			return undefined;
		}

		return {
			consumed: parsed.consumed,
			parsed: transformed as Exclude<T2, undefined>,
		};
	};
}
