import test from "node:test";
import assert from "node:assert";
import { buildRequestUrl, buildRequestOptions } from "../utils/requestBuilder.js";

test("buildRequestUrl", () => {
  assert.strictEqual(buildRequestUrl("https://api", "products"), "https://api/products");
});

test("buildRequestOptions GET", () => {
  const options = buildRequestOptions("GET", []);
  assert.strictEqual(options.method, "GET");
  assert.deepStrictEqual(options.headers, { "Content-Type": "application/json" });
  assert.strictEqual(options.body, undefined);
});

test("buildRequestOptions POST with product data", () => {
  const options = buildRequestOptions("POST", ["Test Product", "15.5", "electronics"]);
  assert.strictEqual(options.method, "POST");
  assert.strictEqual(options.body, JSON.stringify({ title: "Test Product", price: 15.5, category: "electronics" }));
});
