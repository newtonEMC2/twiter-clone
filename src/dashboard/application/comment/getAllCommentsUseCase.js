const getAllCommentsUseCase =
  ({ commentsRepository, commentsStore }) =>
  async ({ dispatch }) => {
    const comments = await commentsRepository.getAllComments().catch();
    dispatch(commentsStore.initComments({ comments }));
  };

export { getAllCommentsUseCase };
