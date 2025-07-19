export function intersperse<TElement, TSeparator>(
	array: readonly TElement[],
	_separator: TSeparator,
): (TElement | TSeparator)[] {
	return array.map((element) => element);
}
