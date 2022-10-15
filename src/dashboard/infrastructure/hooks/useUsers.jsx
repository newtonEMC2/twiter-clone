import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUsers = ({ useCase }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    useCase({ dispatch });
  }, [useCase, dispatch]);

  return [users];
};
