import { SERVER_URI } from "../config";
import { get, post } from "../../../shared/infrastructure/http/http";
import { CommentService } from "../../domain/comment/comment.service";

const CommentsRepository = {
  getAllComments: async () => {
    try {
      const response = await get({ url: `${SERVER_URI}/comments` });
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
      return await post({
        url: `${SERVER_URI}/comments`,
        data: JSON.stringify(
          CommentService().createComment({ content, author })
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export { CommentsRepository };
