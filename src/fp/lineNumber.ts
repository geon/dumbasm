export function getLineBeginIndex(input: string, fromIndex: number) {
	if (fromIndex === 0) {
		return 0;
	}

	const lastIndex = input.lastIndexOf("\n", fromIndex - 1);

	return lastIndex + 1;
}

export function getLineEndIndex(_input: string, _fromIndex: number) {
	return undefined;
}
