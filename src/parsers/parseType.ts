import type { Parser } from "./combinators/Parser.js";
import { parseString } from "./combinators/parseString.js";

export type Type = "uint8";

export const parseType: Parser<Type> = parseString("uint8");
