import { REQUEST_END, REQUEST_START } from "../actions/api";

export const initialState = {
  requests: 0,
};

const apiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        requests: state.requests + 1,
      };

    case REQUEST_END:
      return {
        ...state,
        requests: state.requests - 1,
      };
    default:
      return state;
  }
};

export default apiReducer;
