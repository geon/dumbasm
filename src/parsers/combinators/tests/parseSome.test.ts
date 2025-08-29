import { parseOneOrMore, parseZeroOrMore } from "../parseSome.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";
import { failParsing } from "../Parser.js";
import { parseEof } from "../parseEof.js";

testExamples<readonly string[] | readonly undefined[]>("parseSome", [
	{
		name: "parseOneOrMore > match",
		parser: parseOneOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
	{
		name: "parseZeroOrMore > match",
		parser: parseZeroOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
	{
		name: "parseOneOrMore no match",
		parser: parseOneOrMore(parseChar("b")),
		input: "abc",
		result: failParsing(),
	},
	{
		name: "parseZeroOrMore no match",
		parser: parseZeroOrMore(parseChar("b")),
		input: "abc",
		result: {
			consumed: 0,
			parsed: [],
		},
	},
	{
		name: "zero-width",
		parser: parseOneOrMore(parseEof),
		input: "",
		result: {
			consumed: 0,
			parsed: [undefined],
		},
	},
]);
