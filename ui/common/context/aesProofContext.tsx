"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [aesWorkerClient, setAesWorkerClient] = useState<
    AesWorkerClient | undefined
  >();

  useEffect(() => {
    const setup = async () => {
      try {
        const client = new AesWorkerClient();
        setAesWorkerClient(client);

        await client.loadContract();

        console.log("Compiling the contract...");
        await client.compileContract();

        console.log("Worker and contract are ready!");
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
      if (!aesWorkerClient) {
        throw new Error("aesWorkerClient not initialized");
      }

      return await aesWorkerClient.encrypt(message, aesKey).toString();
    },
    [aesWorkerClient]
  );

  const getDecryptionProof = useCallback(
    async (message: string, aesKey: string): Promise<string> => {
      if (!aesWorkerClient) {
        throw new Error("aesWorkerClient not initialized");
      }
      return await aesWorkerClient.decrypt(message, aesKey).toString();
    },
    [aesWorkerClient]
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
