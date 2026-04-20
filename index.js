import { makeRequest } from "./utils/api.js";
import { extractArguments } from "./utils/args.js";

const { method, resource, additionalArgs } = extractArguments(process.argv);

await makeRequest(method, resource, additionalArgs);
