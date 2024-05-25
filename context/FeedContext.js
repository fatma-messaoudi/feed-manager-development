"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";


const FeedContext = createContext();

export const FeedProvider = ({ children }) => {

  const [client, setClient] = useState(null);

  return (
    <FeedContext.Provider
      value={{
        client,
        setClient
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeedContext must be used within an FeedProvider");
  }
  return context;
};
