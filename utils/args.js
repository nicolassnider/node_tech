import { HTTP_METHODS } from "./constants.js";
import { isValidHttpMethod, hasRequiredArguments } from "./validators.js";

function displayUsageInstructions() {
  console.error("Usage: npm run start <METHOD> <RESOURCE> [ARGS...]");
  console.error("Examples:");
  console.error("  npm run start GET products");
  console.error("  npm run start GET products/15");
  console.error("  npm run start POST products T-Shirt-Rex 300 remeras");
  console.error("  npm run start DELETE products/7");
}

function validateCommandLineArguments(args) {
  if (!hasRequiredArguments(args)) {
    displayUsageInstructions();
    process.exit(1);
  }
}

function validateHttpMethod(method) {
  if (!isValidHttpMethod(method)) {
    console.error(`Error: Invalid HTTP method "${method}"`);
    process.exit(1);
  }
}

function extractArguments(argv) {
  const args = argv.slice(2);

  validateCommandLineArguments(args);

  const method = args[0].toUpperCase();
  validateHttpMethod(method);

  const resource = args[1];
  const additionalArgs = args.slice(2);

  return { method, resource, additionalArgs };
}

export { extractArguments };
