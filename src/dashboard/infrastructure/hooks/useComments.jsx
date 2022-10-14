import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useComments = ({ getAllCommentsUseCase }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  useEffect(() => {
    getAllCommentsUseCase({ dispatch });
  }, [getAllCommentsUseCase, dispatch]);

  return [comments];
};
