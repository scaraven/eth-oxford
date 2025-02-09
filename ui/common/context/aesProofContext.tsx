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
  aesWorkerClient: AesWorkerClient | undefined;
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

        await client.setActiveInstanceToDevnet();
        await client.loadContracts();
        await client.compileAseContract();
        await client.compileVerifierContract();
        await client.verifierInitAndFetch();

        console.log("Worker and contract are ready!");
        setIsLoading(false);
      } catch (error) {
        alert("Failed to compile contract");
        console.error("Failed to compile contract", error);
      }
    };
    setup();
  }, []);

  return (
    <AesProofContext.Provider value={{ aesWorkerClient, isLoading }}>
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
