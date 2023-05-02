import { create } from "zustand";
import { IUser } from "../utils/interfaces";
import axios from "axios";
import { BASE_URL } from "../config/config";

interface State {
  users: IUser[];
  editingUserId: null | number;
  loading: boolean;
  error: null | string;
  setEditingUserId: (userId: number | null) => void;
  fetchUsers: () => void;
  deleteUser: (userId: number) => void;
  createUser: (userData: Omit<IUser, "id">) => void;
  updateUser: (userId: number, userData: Omit<IUser, "id">) => void;
}

export const useUsersStore = create<State>((set, get) => ({
  users: [],
  editingUserId: null,
  loading: false,
  error: null,
  setEditingUserId: (userId: number | null) => set({ editingUserId: userId }),
  fetchUsers: async () => {
    set(() => ({ loading: true }));
    try {
      const { data } = await axios.get(BASE_URL);
      set(() => ({ users: data, error: null }));
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      set(() => ({ error: errorMessage }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  deleteUser: async (userId: number) => {
    set(() => ({ loading: true }));
    try {
      await axios.delete(`${BASE_URL}/${userId}`);
      get().fetchUsers();
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      set(() => ({ error: errorMessage }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  createUser: async (userData: Omit<IUser, "id">) => {
    set(() => ({ loading: true }));
    try {
      await axios.post(BASE_URL, userData);
      get().fetchUsers();
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      set(() => ({ error: errorMessage }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateUser: async (userId: number, userData: Omit<IUser, "id">) => {
    set(() => ({ loading: true }));
    try {
      await axios.put(`${BASE_URL}/${userId}`, userData);
      get().fetchUsers();
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      set(() => ({ error: errorMessage }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
