import { CommentsRepository as cr } from "../../infrastructure/repositories/comments.repository";

export const commentsRepository = {
  getAllComments: () => {
    return cr().getAllComments();
  },
  createComment: ({ content, author }) => {
    return cr().createComment({ content, author });
  },
};
