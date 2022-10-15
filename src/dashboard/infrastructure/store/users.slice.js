import { UserService } from "../../domain/user/user.service";

const SET_USERS = "SET_USERS";

export const setUsersAction = ({ payload }) => ({
  type: SET_USERS,
  payload: UserService().getUsers({ users: payload }),
});

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};
