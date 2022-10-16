import { UserService } from "../../domain/user/user.service";

const SET_AUTH = "SET_AUTH";

export const setAuthenticatedUserAction = ({ payload }) => ({
  type: SET_AUTH,
  payload: UserService().getUser({ user: payload }),
});

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
