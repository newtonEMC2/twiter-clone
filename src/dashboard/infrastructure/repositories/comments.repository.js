import { COMMENTS_SERVER_URI } from "../config";
import { get, post } from "../../../shared/infrastructure/http/http";
import { CommentService } from "../../domain/comment/comment.service";

const CommentsRepository = {
  getAllComments: async () => {
    try {
      const response = await get({ url: `${COMMENTS_SERVER_URI}/comments` });
      const comments = await response.json();
      return CommentService().getComments({
        comments,
      });
    } catch (error) {
      console.log(error);
    }
  },

  createComment: async ({ content, author }) => {
    try {
      const comment = CommentService().createComment({ content, author });
      await post({
        url: `${COMMENTS_SERVER_URI}/comments`,
        data: JSON.stringify(comment),
      });
      return comment;
    } catch (error) {
      console.log(error);
    }
  },
};

export { CommentsRepository };
