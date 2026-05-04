import { Product } from "../models/Product.js";

function mapToProduct(item) {
  // Simple heuristic to verify if the object looks like a product before mapping
  if (item && typeof item === "object" && (item.id !== undefined || item.title)) {
    return new Product({ ...item });
  }
  return item;
}

function handleSuccessResponse(data) {
  let processedData;
  
  if (Array.isArray(data)) {
    processedData = data.map(mapToProduct);
  } else {
    processedData = mapToProduct(data);
  }

  const formattedOutput = JSON.stringify(processedData, null, 2);
  console.log(formattedOutput);
}

function handleErrorResponse(status, statusText) {
  const errorMessage = `Error: ${status} ${statusText}`;
  console.error(errorMessage);
  process.exit(1);
}

function handleNetworkError(error) {
  const errorMessage = `Error: ${error.message}`;
  console.error(errorMessage);
  process.exit(1);
}

export { handleSuccessResponse, handleErrorResponse, handleNetworkError };
