import { parseDependent } from "../parseDependent.js";
import { parseError } from "../parseError.js";
import { createParseError } from "../Parser.js";
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
]);
