import type { ParseFailure, Parser } from "./Parser.js";

type Tail<T extends readonly unknown[]> = T extends readonly [
	unknown,
	...infer Rest,
]
	? Rest
	: readonly [];

type SequenceResults<TParsers extends readonly Parser<unknown>[]> =
	TParsers extends readonly []
		? []
		: [
				Exclude<ReturnType<TParsers[0]>, ParseFailure>["parsed"],
				...SequenceResults<Tail<TParsers>>,
			];

export function parseSequence<const Parsers extends readonly Parser<unknown>[]>(
	_parsers: Parsers,
): Parser<SequenceResults<Parsers>> {
	return (_input, _fromIndex) => {
		return {
			consumed: 0,
			parsed: [] as any,
		};
	};
}
