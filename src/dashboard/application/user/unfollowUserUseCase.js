const unfollowUserUseCase =
  ({ usersRepository, UserService }) =>
  async ({ id, user }) => {
    const updatedUser = UserService().unfollowUser({ id, user });
    await usersRepository.unfollowUser({ user: updatedUser }).catch();
  };

export { unfollowUserUseCase };
