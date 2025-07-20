import {
	failParsing,
	parsingFailed,
	type ParseFailure,
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
				Exclude<ReturnType<TParsers[0]>, ParseFailure>["parsed"],
				...SequenceResults<Tail<TParsers>>,
			];

export function parseSequence<const Parsers extends readonly Parser<unknown>[]>(
	parsers: Parsers,
): Parser<SequenceResults<Parsers>> {
	return (input, fromIndex) => {
		const parser = parsers[0];
		if (!parser) {
			return {
				consumed: 0,
				parsed: [] as any,
			};
		}

		const parseResult = parser(input, fromIndex);
		if (parsingFailed(parseResult)) {
			return failParsing();
		}

		return {
			consumed: parseResult.consumed,
			parsed: [parseResult.parsed],
		};
	};
}
