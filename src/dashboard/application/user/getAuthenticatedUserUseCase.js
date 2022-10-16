const getAuthenticatedUserUseCase =
  ({ usersRepository, usersStore }) =>
  async ({ id, dispatch }) => {
    const authenticatedUser = await usersRepository
      .getAuthenticatedUser({ id })
      .catch();
    dispatch(usersStore.setAuthenticatedUser({ user: authenticatedUser }));
  };

export { getAuthenticatedUserUseCase };
