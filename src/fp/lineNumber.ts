export function getLineBeginIndex(input: string, fromIndex: number) {
	if (fromIndex === 0) {
		return 0;
	}

	const lastIndex = input.lastIndexOf("\n", fromIndex - 1);

	return lastIndex + 1;
}

export function getLineEndIndex(input: string, fromIndex: number) {
	const index = input.indexOf("\n", fromIndex);
	if (index === -1) {
		return undefined;
	}

	return index;
}
