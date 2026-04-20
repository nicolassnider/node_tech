import { HTTP_METHODS } from "./constants.js";

function isValidHttpMethod(method) {
  return Object.values(HTTP_METHODS).includes(method);
}

function hasRequiredArguments(args) {
  return args.length >= 2;
}

function isPostWithProductData(method, additionalArgs) {
  return method === HTTP_METHODS.POST && additionalArgs.length >= 3;
}

export {
  isValidHttpMethod,
  hasRequiredArguments,
  isPostWithProductData,
};
