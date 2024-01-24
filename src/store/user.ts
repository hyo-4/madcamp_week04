import create from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userid: String;
  username: String;
  setUserId: (newUserId: string) => void;
  setUserName: (newUserName: string) => void;
}

const StorageKey = "storage-key";

// export const useUserStore = create<UserStore>((set) => ({
//   userid: "",
//   username: "",
//   setUserId: (newUserId: string) => {
//     set({ userid: newUserId });
//   },
//   setUserName: (newUserName: string) => {
//     set({ username: newUserName });
//   },
// }));

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userid: "",
      username: "",
      setUserId: (newuserid: string) => {
        set({ userid: newuserid });
      },
      setUserName: (newUserName: string) => {
        set({ username: newUserName });
      },
    }),
    {
      name: StorageKey,
    }
  )
);
