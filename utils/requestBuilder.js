import { HEADERS } from "./constants.js";
import { isPostWithProductData } from "./validators.js";

function buildRequestUrl(apiUrl, resource) {
  return `${apiUrl}/${resource}`;
}

function buildRequestOptions(method, additionalArgs) {
  const options = {
    method,
    headers: HEADERS.JSON,
  };

  if (isPostWithProductData(method, additionalArgs)) {
    options.body = buildProductPayload(additionalArgs);
  }

  return options;
}

function buildProductPayload(additionalArgs) {
  const [title, price, category] = additionalArgs;
  const payload = {
    title,
    price: parseFloat(price),
    category,
  };
  return JSON.stringify(payload);
}

export { buildRequestUrl, buildRequestOptions };
