import { parseAlternatives } from "./parseAlternatives.js";
import { parseChar } from "./parseChar.js";
import { parseEof } from "./parseEof.js";

const parseNewline = parseChar("\n");

export const parseEol = parseAlternatives([parseNewline, parseEof]);
