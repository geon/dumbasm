import { parseNumber } from "../../parseNumber.js";
import { parseAlternatives } from "../parseAlternatives.js";
import { parseAnyChar } from "../parseAnyChar.js";
import { parseDependent } from "../parseDependent.js";
import { parseError } from "../parseError.js";
import { parseNothing } from "../parseNothing.js";
import { createParseError, createParseResult } from "../Parser.js";
import { parseOneOrMore } from "../parseSome.js";
import { parseString } from "../parseString.js";
import { parseWithErrorMessage } from "../parseWithErrorMessage.js";
import { testExamples } from "./testExamples.js";

testExamples<unknown>("parseDependent", [
	{
		name: "no match",
		parser: parseDependent(parseWithErrorMessage("this", parseError), () =>
			parseWithErrorMessage("not this", parseError),
		),
		input: "",
		result: createParseError(0, "this"),
	},
	{
		name: "match determinant",
		parser: parseDependent(parseNothing("determinant"), () =>
			parseWithErrorMessage("this", parseError),
		),
		input: "",
		result: createParseError(0, "this"),
	},
	{
		name: "match next",
		parser: parseDependent(
			parseAlternatives([
				//
				parseString("chars"),
				parseString("number"),
			]),
			(type) =>
				({
					chars: parseOneOrMore(parseAnyChar),
					number: parseNumber,
				})[type],
		),
		input: "number$123",
		result: createParseResult(10, 0x123),
	},
]);
