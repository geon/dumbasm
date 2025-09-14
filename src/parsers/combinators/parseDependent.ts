import { parsingFailed, type Parser } from "./Parser";

export function parseDependent<
	const A,
	const B extends (dependency: A) => Parser<unknown>,
>(parseDeterminant: Parser<A>, _getNextParser: B): ReturnType<B> {
	return ((input, fromIndex) => {
		const parsedDeterminant = parseDeterminant(input, fromIndex);
		if (parsingFailed(parsedDeterminant)) {
			return parsedDeterminant;
		}

		throw new Error("Not implemented.");
	}) as ReturnType<B>;
}
