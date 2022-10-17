import { UserService } from "../../domain/user/user.service";
import { usersRepository } from "../../domain/user/user.repository";
import { setUsersAction } from "./users.slice";

const SET_INIT = "SET_INIT";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

export const selectAuthenticatedUser = (state) => state.auth;

export const setAuthenticatedUserAction = ({ payload }) => ({
  type: SET_INIT,
  payload: UserService().getUser({ user: payload }),
});
export const addFollowingUserAction = ({ payload }) => ({
  type: FOLLOW_USER,
  payload,
});
export const removeFollowingUserAction = ({ payload }) => ({
  type: UNFOLLOW_USER,
  payload,
});

export const authMiddl = () => (next) => async (action) => {
  if (action.type === SET_INIT) {
    const authenticatedUser = await usersRepository.getAuthenticatedUser({
      id: action.payload.id,
    });
    next(setAuthenticatedUserAction({ payload: authenticatedUser }));

    const users = await usersRepository.getAllUsers({
      authenticatedUserId: authenticatedUser.id,
    });
    return next(
      setUsersAction({
        payload: UserService().getUsers({
          users,
        }),
      })
    );
  }
  return next(action);
};

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_INIT:
      return { ...state, ...action.payload };
    case FOLLOW_USER:
      return { ...state, following: [...state.following, action.payload] };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (followingIds) => followingIds !== action.payload
        ),
      };
    default:
      return state;
  }
};
