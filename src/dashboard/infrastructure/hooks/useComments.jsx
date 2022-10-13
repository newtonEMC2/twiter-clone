import { useEffect, useState } from "react";

export const useComments = ({ getAllCommentsUseCase }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getAllCommentsUseCase().then(setComments);
  }, [getAllCommentsUseCase]);

  return [comments];
};
