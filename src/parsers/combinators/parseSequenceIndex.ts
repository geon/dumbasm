import type { Parser } from "./Parser";
import { type SequenceResults } from "./parseSequence";

export const parseSequenceIndex = <
	const ValueIndex extends number,
	const Parsers extends readonly Parser<unknown>[],
>(
	_valueIndex: ValueIndex,
	_parsers: Parsers,
): Parser<SequenceResults<Parsers>[ValueIndex]> => {
	throw new Error("valueIndex out of bounds");
};
