import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create a new context for storing user information
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user } = useAuth0();

  // Extract the unique ID from the user information
  let userId = null;
  if (user) {
    const uniqueId = user?.sub.split("|");
    userId = uniqueId[1];
  }

  return (
    // Provide the user information to child components through the context
    <UserContext.Provider value={{ user, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
