import { createContext, useContext, useState } from "react";

const SlidingBarContext = createContext();

export function SlidingBarProvider({ children }) {
  const [isSlidingBarOpen, setSlidingBarOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const toggleSlidingBar = () => {
    setSlidingBarOpen((prev) => !prev);
    setIsRotated((prev) => !prev);
  };

  return (
    <SlidingBarContext.Provider
      value={{
        isSlidingBarOpen,
        isRotated,
        toggleSlidingBar,
      }}
    >
      {children}
    </SlidingBarContext.Provider>
  );
}

export function useSlidingBar() {
  const context = useContext(SlidingBarContext);
  if (!context) {
    throw new Error("useSlidingBar must be used within a SlidingBarProvider");
  }
  return context;
}
