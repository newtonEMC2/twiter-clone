import { CommentService } from "../../src/dashboard/domain/comment/comment.service";
import { UserService } from "../../src/dashboard/domain/user/user.service";

const CommentsRepositoryMock = () => {
  const comments = [
    {
      id: "ed20e20d-dfff-41c0-bb74-d3b379eabcde",
      author: {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001",
        name: "Alexis",
      },
      date: 1666086904667,
      content: "1st message from Alexis",
    },
    {
      id: "ed20e20d-dfff-41c0-bb74-d3b379ecaaaa",
      author: {
        id: "9b13234d-3b7d-4bad-9bdd-2b0d7b300099",
        name: "Veronica",
      },
      date: 1666086904668,
      content: "1st message from veronica",
    },
    {
      id: "9b13234d-3b7d-4bad-9bdd-2b0d7987ayr8",
      author: {
        id: "9b13234d-3b7d-4bad-9bdd-2b0d7b300888",
        name: "Marta",
      },
      date: 1666086904170,
      content: "1st message from Marta",
    },
    {
      id: "9b13234d-3b7d-4bad-9bdd-2b0d7b300poi",
      author: {
        id: "9b13234d-hr76-4bad-9bdd-2b0d7b300777",
        name: "Elena",
      },
      date: 1666086904171,
      content: "1st message from Elena",
    },
    {
      id: "9b13234d-3b7d-4bad-9bdd-2b0d7b3yoyoi",
      author: {
        id: "9b13234d-hr76-4bad-9bdd-2b0d7b300119",
        name: "Jose",
      },
      date: 1666086904171,
      content: "1st message from Jose",
    },
  ];

  return {
    getAllComments: async () => {
      return CommentService().getComments({
        comments,
      });
    },

    createComment: async ({ content, author }) => {
      const user = UserService().getUser({ user: author });
      const comment = CommentService().createComment({ content, author: user });
      return comment;
    },
  };
};

export { CommentsRepositoryMock };
