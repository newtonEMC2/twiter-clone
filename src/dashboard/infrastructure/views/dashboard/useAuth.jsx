import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = ({ useCase, usersStore }) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(usersStore.selectAuthenticatedUser);
  const firstTimeRef = useRef(true);
  useEffect(() => {
    if (firstTimeRef.current) {
      useCase({ dispatch, id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b300001" });
      firstTimeRef.current = false;
    }
  }, [useCase, dispatch]);

  return [authenticatedUser];
};
