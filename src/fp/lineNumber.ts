export function getLineBeginIndex(input: string, fromIndex: number) {
	const lastIndex = input.lastIndexOf("\n", fromIndex - 1);

	return lastIndex + 1;
}
