import { parseComment } from "../parseComment.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseComment", [
	{
		input: "not a comment",
		parser: parseComment,
		result: undefined,
	},
	{
		input: ";",
		parser: parseComment,
		result: {
			consumed: 1,
			parsed: "",
		},
	},
	{
		name: "multiple lines",
		input: "; multiple\nlines",
		parser: parseComment,
		result: {
			consumed: 10,
			parsed: " multiple",
		},
	},
	{
		input: "; TODO: Rewrite in Rust.",
		parser: parseComment,
		result: {
			consumed: 24,
			parsed: " TODO: Rewrite in Rust.",
		},
	},
]);
