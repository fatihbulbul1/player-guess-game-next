import { createContext, useState } from "react";

interface AppContextInterface {
  loggedUsername: string;
  setLoggedUsername: (loggedUsername: string) => void;
}
interface Props {
  children: React.ReactNode;
}
export const AppContext = createContext<AppContextInterface>({
  loggedUsername: "",
  setLoggedUsername: () => {},
});

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [loggedUsername, setLoggedUsername] = useState("");

  return (
    <AppContext.Provider value={{ loggedUsername, setLoggedUsername }}>
      {children}
    </AppContext.Provider>
  );
};
