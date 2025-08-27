import { parseChar, parseCharCaseInsensitive } from "./parseChar.js";
import { parseMonad } from "./parseMonad.js";
import type { Parser } from "./Parser.js";
import { parseSequence } from "./parseSequence.js";

export function parseString<TString extends string>(
	string: TString,
): Parser<TString> {
	return parseMonad(
		parseSequence(string.split("").map(parseChar)),
		() => string,
	);
}

export function parseStringCaseInsensitive<TString extends string>(
	string: TString,
): Parser<TString> {
	return parseMonad(
		parseSequence(string.split("").map(parseCharCaseInsensitive)),
		() => string,
	);
}
