import { USER_INFO } from "./constants";

export let data = {
  userInfo: typeof window !== 'undefined' && localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

export function reducer(state, action) {
  switch (action.type) {
    case USER_INFO: {
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
}