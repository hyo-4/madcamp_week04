import create from "zustand";

interface UserStore {
  userid: String;
  username: String;
  setUserId: (newUserId: string) => void;
  setUserName: (newUserName: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userid: "",
  username: "",
  setUserId: (newUserId: string) => {
    set({ userid: newUserId });
  },
  setUserName: (newUserName: string) => {
    set({ username: newUserName });
  },
}));
