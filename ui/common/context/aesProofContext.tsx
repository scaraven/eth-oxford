"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MyProgram } from "../../../contracts/build/src/Example/Program";

type AesProofContextType = {
  getEncryptionProof: (message: string, aesKey: string) => Promise<string>;
  getDecryptionProof: (message: string, aesKey: string) => Promise<string>;
  isLoading: boolean;
};

const AesProofContext = createContext<AesProofContextType | undefined>(
  undefined
);

export const AesProofProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zkInstance, setZkInstance] = useState<typeof MyProgram>();

  useEffect(() => {
    const setup = async () => {
      try {
        console.log("Compiling contract...");
        const newInstance = MyProgram;
        await newInstance.compile();
        setZkInstance(newInstance);
        setIsLoading(false);
      } catch (error) {
        alert("Failed to compile contract");
        console.error("Failed to compile contract", error);
      }
    };
    setup();
  }, []);

  const getEncryptionProof = useCallback(
    async (message: string, aesKey: string): Promise<string> => {
      if (!zkInstance) {
        throw new Error("zkInstance not initialized");
      }
      return await zkInstance.baseCase().toString();
    },
    [zkInstance]
  );

  const getDecryptionProof = useCallback(
    async (message: string, aesKey: string): Promise<string> => {
      if (!zkInstance) {
        throw new Error("zkInstance not initialized");
      }
      return await zkInstance.baseCase().toString();
    },
    [zkInstance]
  );

  return (
    <AesProofContext.Provider
      value={{ getEncryptionProof, getDecryptionProof, isLoading }}
    >
      {children}
    </AesProofContext.Provider>
  );
};

export const useAesProof = (): AesProofContextType => {
  const context = useContext(AesProofContext);
  if (!context) {
    throw new Error("useAesProof must be used within an AesProofProvider");
  }
  return context;
};
