import { uuidService } from "../../../shared/domain/uuid.repository";
import { Comment } from "./comment.aggregate";

const CommentService = () => {
  const getComments = ({ comments }) => {
    return comments.map(({ id, author, date, content }) => {
      return Comment({ id, author, date, content });
    });
  };

  const createComment = ({ content, author }) => {
    if (!content) throw new Error("content is needed");
    return Comment({
      id: uuidService.generateUid(),
      date: Date.now(),
      content,
      author,
    });
  };

  return { getComments, createComment };
};

export { CommentService };
