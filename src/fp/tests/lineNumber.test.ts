import { suite, test, expect } from "vitest";
import { getLineBeginIndex } from "../lineNumber";

suite("lineNumber", () => {
	suite("getLineBeginIndex", () => {
		test("empty", () => {
			expect(getLineBeginIndex("", 0)).toBe(0);
		});
	});
});
