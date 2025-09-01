import {
	createParseResult,
	parsingFailed,
	type ParseError,
	type Parser,
} from "./Parser.js";

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
	parsers: Parsers,
): Parser<SequenceResults<Parsers>> {
	return (input, fromIndex) => {
		const parser = parsers[0];
		if (!parser) {
			return createParseResult(0, [] as any);
		}

		const parseResult = parser(input, fromIndex);
		if (parsingFailed(parseResult)) {
			return parseResult;
		}

		const consumed = parseResult.consumed;
		const parsed = [parseResult.parsed];

		return createParseResult(consumed, parsed as SequenceResults<Parsers>);
	};
}
