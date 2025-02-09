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

        // console.log("Looking for Mina...");
        // const mina = (window as any).mina;
        // if (mina == null) {
        //   alert("Mina not found");
        //   return;
        // }
        // const publicKeyBase58: string = (await mina.requestAccounts())[0];
        // console.log("Mina found! Public key:", publicKeyBase58);

        await client.compileAseContract();
        // await client.compileVerifierContract();
        // await client.verifierInitAndFetch(publicKeyBase58);

        console.log("Worker and contract are ready!");
        setIsLoading(false);
      } catch (error) {
        console.error("Cometext / worker failure", error);
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
