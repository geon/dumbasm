import {
	failParsing,
	parsingFailed,
	type ParseFailure,
	type Parser,
} from "./Parser.js";

export function parseAlternatives<TParsers extends readonly Parser<unknown>[]>(
	parsers: TParsers,
): Parser<Exclude<ReturnType<TParsers[number]>, ParseFailure>["parsed"]> {
	return (...args) => {
		const failures: ParseFailure[] = [];

		for (const parser of parsers) {
			const parsed = parser(...args);
			if (!parsingFailed(parsed)) {
				return parsed;
			}
			failures.push(parsed);
		}

		return failParsing(
			args[1],
			[
				"No alternative matched.",
				...failures.map((fail) => "\t" + fail.message),
			].join("\n"),
		);
	};
}
