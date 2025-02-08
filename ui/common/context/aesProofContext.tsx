"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import AesWorkerClient from "../workers/aes/AesWorkerClient";

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
  const [zkappWorkerClient, setZkappWorkerClient] =
    useState<null | AesWorkerClient>(null);
  const [hasBeenSetup, setHasBeenSetup] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        if (!hasBeenSetup) {
          console.log("Setting up AES worker client...");
          const aesWorkerClient = new AesWorkerClient();
          setZkappWorkerClient(zkappWorkerClient);

          console.log("Loading AES contract...");
          await aesWorkerClient.loadContract();

          console.log("Compiling AES contract...");
          await aesWorkerClient.compileContract();

          console.log("AES worker client setup complete!");
          setHasBeenSetup(true);
          setIsLoading(false);
        }
      } catch (error: any) {
        alert("Error during setup! See console.");
        console.error(`Error during setup: ${error.message}`);
      }
    };
    setup();
  }, []);

  const getEncryptionProof = async (
    message: string,
    aesKey: string
  ): Promise<string> => {
    return await zkappWorkerClient!.encrypt(message, aesKey);
  };

  const getDecryptionProof = async (
    message: string,
    aesKey: string
  ): Promise<string> => {
    return await zkappWorkerClient!.decrypt(message, aesKey);
  };

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
