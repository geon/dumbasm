import { parseAlternatives } from "./parseAlternatives.js";
import { parseChar } from "./parseChar.js";

const whitespaces = [" ", "\t", "\n", "\r", "\v", "\f"] as const;

export const parseWhitespace = parseAlternatives(whitespaces.map(parseChar));
