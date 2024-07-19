import { Slot } from 'expo-router';
import { SessionProvider } from "../auth/auth";
import "../global.css"
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
