import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from "./useStorageState"
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
const AuthContext = createContext<{
  signIn:  (user:any) => void;
  signOut: () => void;
  session?: string | null|any;
  isLoading: boolean;
}>({
  signIn:  (user:any) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (user:FirebaseAuthTypes.UserCredential) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(user));
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
