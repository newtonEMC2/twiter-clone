import { UserService } from "../../src/dashboard/domain/user/user.service";

const UsersRepositoryMock = () => {
  const usersCollection = [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001",
      name: "Alexis",
      following: ["9b13234d-hr76-4bad-9bdd-2b0d7b300119"],
    },
    {
      id: "9b13234d-3b7d-4bad-9bdd-2b0d7b300099",
      name: "Veronica",
      following: [],
    },
    {
      id: "9b13234d-hr76-4bad-9bdd-2b0d7b300119",
      name: "Jose",
      following: [],
    },
    {
      id: "9b13234d-3b7d-4bad-9bdd-2b0d7b300888",
      name: "Marta",
      following: [],
    },
    {
      id: "9b13234d-hr76-4bad-9bdd-2b0d7b300777",
      name: "Elena",
      following: [],
    },
  ];
  return {
    getUsers: async ({ authenticatedUserId }) => {
      const users = usersCollection.filter(
        (user) => user.id !== authenticatedUserId
      );
      return UserService().getUsers({ users });
    },

    getUserById: async ({ id }) => {
      const user = await usersCollection.filter((user) => user.id === id);
      return UserService().getUser({ user: user.at(0) });
    },

    updateUser: async ({ user }) => {
      return undefined;
    },
  };
};

export { UsersRepositoryMock };
