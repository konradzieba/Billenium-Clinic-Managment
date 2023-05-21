import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type UserInfoType = {
  isLoggedIn: boolean;
  userRole: string | null;
};

const initialState: UserInfoType = {
  isLoggedIn: false,
  userRole: null,
};

const AuthContext = createContext<
  [UserInfoType, React.Dispatch<React.SetStateAction<UserInfoType>>]
>([
  initialState,
  () => void 0, // A dummy function
]);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>(initialState);

  return (
    <AuthContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
	return useContext(AuthContext);
};