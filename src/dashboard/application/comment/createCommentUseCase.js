const createCommentUseCase =
  ({ commentsRepository, commentsStore }) =>
  async ({ content, dispatch }) => {
    const comment = await commentsRepository
      .createComment({ content, author: "alexis" })
      .catch();
    dispatch(commentsStore.updateComments({ comment }));
  };

export { createCommentUseCase };
