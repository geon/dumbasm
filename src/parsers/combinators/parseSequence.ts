import { parsingFailed, type ParseFailure, type Parser } from "./Parser.js";

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
		let consumed = 0;
		const parsed = [];
		for (const parser of parsers) {
			const parseResult = parser(input, fromIndex + consumed);
			if (parsingFailed(parseResult)) {
				return parseResult;
			}
			consumed += parseResult.consumed;
			parsed.push(parseResult.parsed);
		}

		return {
			type: "success",
			consumed,
			parsed: parsed as SequenceResults<Parsers>,
		};
	};
}
