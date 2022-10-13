const createCommentUseCase =
  ({ commentsRepository }) =>
  async ({ content }) => {
    await commentsRepository
      .createComment({ content, author: "alexis" })
      .catch();
  };

export { createCommentUseCase };
