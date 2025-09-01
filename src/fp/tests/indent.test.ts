import { expect, suite, test } from "vitest";
import { indent } from "../indent";

suite("indent", () => {
	test("empty", () => {
		expect(indent("")).toBe("\t");
	});
});
