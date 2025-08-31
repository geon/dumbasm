import { createParseResult, type ParseError, type Parser } from "./Parser.js";

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
				Exclude<ReturnType<TParsers[0]>, ParseError>["parsed"],
				...SequenceResults<Tail<TParsers>>,
			];

export function parseSequence<const Parsers extends readonly Parser<unknown>[]>(
	_parsers: Parsers,
): Parser<SequenceResults<Parsers>> {
	return (_input, _fromIndex) => {
		return createParseResult(0, [] as any);
	};
}
