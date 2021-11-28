export const API_CALL = "API_CALL";
export const API_CANCEL = "API_CANCEL";
export const REQUEST_START = "REQUEST_START";
export const REQUEST_END = "REQUEST_END";

export const requestStart = () => ({
  type: REQUEST_START,
});

export const requestEnd = () => ({
  type: REQUEST_END,
});
