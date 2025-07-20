import { parseAnyChar } from "./parseAnyChar.js";
import { parseMonad } from "./parseMonad.js";

const whitespaces = [" ", "\t"];

export const parseWhitespace = parseMonad(parseAnyChar, (parsed) =>
	whitespaces.includes(parsed) ? parsed : undefined,
);
