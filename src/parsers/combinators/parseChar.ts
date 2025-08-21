import { parseAnyChar } from "./parseAnyChar.js";
import { parseMonad } from "./parseMonad.js";

export function parseChar<Char extends string>(char: Char) {
	if (char.length !== 1) {
		throw new Error(`Not a char: "${char}"`);
	}

	return parseMonad(parseAnyChar, (parsed) =>
		parsed !== char ? undefined : char,
	);
}

export function parseCharCaseInsensitive<Char extends string>(char: Char) {
	if (char.length !== 1) {
		throw new Error(`Not a char: "${char}"`);
	}

	return parseMonad(parseAnyChar, (parsed) =>
		parsed.toLowerCase() !== char.toLowerCase() ? undefined : char,
	);
}
