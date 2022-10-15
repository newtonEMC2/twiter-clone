const getUsersToFollowUseCase =
  ({ usersRepository }) =>
  async () => {
    const usersToFollow = await usersRepository
      .getUsersToFollow({ id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001" })
      .catch();
    return usersToFollow;
  };

export { getUsersToFollowUseCase };
