const createCommentUseCase =
  ({ commentsRepository, commentsStore }) =>
  async ({ content, dispatch }) => {
    const comment = await commentsRepository
      .createComment({
        content,
        author: {
          id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001",
          name: "Alexis",
        },
      })
      .catch();
    dispatch(commentsStore.updateComments({ comment }));
  };

export { createCommentUseCase };
