import test from "node:test";
import assert from "node:assert";
import { isValidHttpMethod, hasRequiredArguments, isPostWithProductData } from "../utils/validators.js";

test("isValidHttpMethod", () => {
  assert.strictEqual(isValidHttpMethod("GET"), true);
  assert.strictEqual(isValidHttpMethod("POST"), true);
  assert.strictEqual(isValidHttpMethod("DELETE"), true);
  assert.strictEqual(isValidHttpMethod("PUT"), false);
});

test("hasRequiredArguments", () => {
  assert.strictEqual(hasRequiredArguments([]), false);
  assert.strictEqual(hasRequiredArguments(["GET"]), false);
  assert.strictEqual(hasRequiredArguments(["GET", "products"]), true);
});

test("isPostWithProductData", () => {
  assert.strictEqual(isPostWithProductData("POST", ["title", "10", "category"]), true);
  assert.strictEqual(isPostWithProductData("POST", ["title", "10"]), false);
  assert.strictEqual(isPostWithProductData("GET", ["title", "10", "category"]), false);
});
