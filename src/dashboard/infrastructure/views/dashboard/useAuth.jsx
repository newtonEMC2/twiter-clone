import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = ({ useCase }) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.auth);
  useEffect(() => {
    useCase({ dispatch, id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001" });
  }, [useCase, dispatch]);

  return [authenticatedUser];
};
