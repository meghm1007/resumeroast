import { createContext } from "react";

interface UserDetailContextType {
  userDetail: {
    credits: number;
    [key: string]: any; // for other potential properties
  } | null;
  setUserDetail: React.Dispatch<React.SetStateAction<any>>;
  getUserDetail?: () => void;
}

// Provide default values matching the type
export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
  getUserDetail: () => {},
});
