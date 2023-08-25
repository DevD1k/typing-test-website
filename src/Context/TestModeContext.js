import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export function TestModeContextProvider({ children }) {
  const [testTime, setTestTime] = useState(15);
  const values = {
    testTime,
    setTestTime,
  };

  return (
    <TestModeContext.Provider value={values}>
      {children}
    </TestModeContext.Provider>
  );
}

export function useTestMode() {
  return useContext(TestModeContext);
}
