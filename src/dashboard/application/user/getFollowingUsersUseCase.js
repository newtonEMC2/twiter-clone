const getFollowingUsersUseCase =
  ({ usersRepository }) =>
  async () => {
    const followingUsers = await usersRepository.getFollowingUsers().catch();
    return followingUsers;
  };

export { getFollowingUsersUseCase };
