const getFollowingUsersUseCase =
  ({ usersRepository, usersStore }) =>
  async ({ dispatch }) => {
    const users = await usersRepository
      .getFollowingUsers({ id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001" })
      .catch();
    dispatch(usersStore.setUsers({ users }));
  };

export { getFollowingUsersUseCase };
