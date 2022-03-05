import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  users: {
    isLoggendId: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "LOG_IN":
      return {
        ...state,
        users: {
          ...state.users,
          isLoggendId: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        users: {
          ...state.users,
          isLoggendId: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
