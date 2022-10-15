const getFollowingUsersUseCase =
  ({ usersRepository, usersStore }) =>
  async ({ dispatch }) => {
    const users = await usersRepository.getFollowingUsers().catch();
    dispatch(usersStore.initUsers({ users }));
  };

export { getFollowingUsersUseCase };
