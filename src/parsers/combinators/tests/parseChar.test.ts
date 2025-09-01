import { suite, test, expect } from "vitest";
import { parseChar } from "../parseChar.js";

suite("parseChar", () => {
	test("too long", () => {
		expect(() => parseChar("too long")).toThrow();
	});
});
