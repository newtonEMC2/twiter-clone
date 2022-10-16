const followUserUseCase =
  ({ usersRepository, UserService }) =>
  async ({ id, user }) => {
    const updatedUser = UserService().followUser({ id, user });
    await usersRepository.followUser({ user: updatedUser }).catch();
  };

export { followUserUseCase };
