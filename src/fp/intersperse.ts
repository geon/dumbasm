export function intersperse<TElement, TSeparator>(
	array: readonly TElement[],
	separator: TSeparator,
): (TElement | TSeparator)[] {
	return array.flatMap((element) => [element, separator]).slice(0, -1);
}
