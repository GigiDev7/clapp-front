import { useState } from "react";
import { useUsersStore } from "../store/store";

export const useModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const setEditingUserId = useUsersStore((state) => state.setEditingUserId);

  const showModal = () => {
    setIsModalShown(true);
  };

  const hideModal = () => {
    setIsModalShown(false);
    setEditingUserId(null);
  };

  return { isModalShown, showModal, hideModal };
};
