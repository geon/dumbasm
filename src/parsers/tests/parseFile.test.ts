import { expect, test } from "vitest";
import { parseFile } from "../parseFile.js";
import { asmSamples } from "./asm-samples.js";
import { dumbasmSamples } from "./dumbasm-samples.js";

test("parseFile", () => {
	expect(parseFile(asmSamples.helloWorld, 0)).toMatchSnapshot();
	expect(parseFile(dumbasmSamples.variableDeclaration, 0)).toMatchSnapshot();
	// expect(parseFile(dumbasmSamples.helloWorld, 0)).toMatchSnapshot();
});
