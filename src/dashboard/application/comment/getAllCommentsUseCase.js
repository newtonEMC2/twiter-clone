const getAllCommentsUseCase =
  ({ commentsRepository }) =>
  async () => {
    const comments = await commentsRepository.getAllComments().catch();
    return comments;
  };

export { getAllCommentsUseCase };
