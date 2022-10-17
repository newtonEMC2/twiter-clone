const followUserUseCase =
  ({ usersRepository, UserService, usersStore }) =>
  async ({ userToFollow, loggedInUser, dispatch }) => {
    const updatedLoggedUser = UserService().followUser({
      id: userToFollow.id,
      user: loggedInUser,
    });
    await usersRepository.followUser({ user: updatedLoggedUser }).catch();
    dispatch(usersStore.setFollowingUsers({ id: userToFollow.id }));
  };

export { followUserUseCase };
