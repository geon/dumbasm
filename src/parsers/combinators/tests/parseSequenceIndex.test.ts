import { suite, test, expect } from "vitest";
import { parseSequenceIndex } from "../parseSequenceIndex.js";

suite("parseSequenceIndex", () => {
	test("out of bounds", () => {
		expect(() => parseSequenceIndex(1, [])).toThrow();
	});
});
