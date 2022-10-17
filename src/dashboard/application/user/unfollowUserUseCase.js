const unfollowUserUseCase =
  ({ usersRepository, UserService, usersStore }) =>
  async ({ userToUnfollow, loggedInUser, dispatch }) => {
    const updatedUser = UserService().unfollowUser({
      id: userToUnfollow.id,
      user: loggedInUser,
    });
    await usersRepository.unfollowUser({ user: updatedUser }).catch();
    dispatch(usersStore.removeFollowingUsers({ id: userToUnfollow.id }));
  };

export { unfollowUserUseCase };
