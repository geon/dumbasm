import { expect, suite, test } from "vitest";
import { intersperse } from "../intersperse";

const separator = ", ";

suite("intersperse", () => {
	test("[]", () => {
		expect(intersperse([], separator).join("")).toBe("");
	});

	test("[x]", () => {
		expect(intersperse(["x"], separator).join("")).toBe("x");
	});

	test("[x, y, z]", () => {
		expect(intersperse(["x", "y", "z"], separator).join("")).toBe("x, y, z");
	});
});
