import { parseComment } from "../parseComment.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseComment", [
	{
		input: "not a comment",
		parser: parseComment,
		result: createParseError(0, 'Expected char ";".'),
	},
	{
		input: ";",
		parser: parseComment,
		result: createParseResult(1, ""),
	},
	{
		name: "multiple lines",
		input: "; multiple\nlines",
		parser: parseComment,
		result: createParseResult(10, " multiple"),
	},
	{
		input: "; TODO: Rewrite in Rust.",
		parser: parseComment,
		result: createParseResult(24, " TODO: Rewrite in Rust."),
	},
]);
