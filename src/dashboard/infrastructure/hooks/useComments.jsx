import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useComments = ({ getAllCommentsUseCase, commentsStore }) => {
  const dispatch = useDispatch();
  const comments = useSelector(commentsStore.selectCommentsFromFollowingUsers);
  useEffect(() => {
    getAllCommentsUseCase({ dispatch });
  }, [getAllCommentsUseCase, dispatch]);

  return [comments];
};
