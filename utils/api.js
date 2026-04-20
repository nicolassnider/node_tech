import { API_URL } from "./constants.js";
import { buildRequestUrl, buildRequestOptions } from "./requestBuilder.js";
import {
  handleSuccessResponse,
  handleErrorResponse,
  handleNetworkError,
} from "./responseHandler.js";

async function makeRequest(method, resource, additionalArgs) {
  try {
    const url = buildRequestUrl(API_URL, resource);
    const options = buildRequestOptions(method, additionalArgs);
    const response = await fetch(url, options);

    if (!response.ok) {
      handleErrorResponse(response.status, response.statusText);
      return;
    }

    const data = await response.json();
    handleSuccessResponse(data);
  } catch (error) {
    handleNetworkError(error);
  }
}

export { makeRequest };
