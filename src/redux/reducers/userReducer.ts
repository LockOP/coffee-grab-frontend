import { LOG_IN, LOG_OUT, UPDATE_USER } from "../constants";

const initialState = {
  user: {},
};

type Action = {
  type: string;
  data: any;
};

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.data,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.data },
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
