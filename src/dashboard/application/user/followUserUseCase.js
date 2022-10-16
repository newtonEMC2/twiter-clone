const followUserUseCase =
  ({ usersRepository }) =>
  async ({ id, user }) => {
    await usersRepository.followUser({ id, user }).catch();
  };

export { followUserUseCase };
