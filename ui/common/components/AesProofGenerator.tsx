import React, { useState } from "react";
import { useAesProof } from "../context/aesProofContext";
import { Proof, SelfProof } from "o1js";
import { AESPublicInput } from "../../../contracts/build/src/AES/AES";

type Props = {
  message: string;
  aesKey: string;
  ciphertext: string;
  isLoading: boolean;
};

const AesProofGenerator: React.FC<Props> = ({
  message,
  aesKey,
  ciphertext,
  isLoading,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [proof, setProof] = useState<
    | { proof: SelfProof<AESPublicInput, void>; auxiliaryOutput: undefined }
    | undefined
  >(undefined);
  const { aesWorkerClient } = useAesProof();

  const generateProof = async () => {
    setIsProcessing(true);
    const proof = await aesWorkerClient?.getAesProof(
      message,
      ciphertext,
      aesKey
    );
    setProof(proof);
    setIsProcessing(false);
  };

  const verifyProof = async () => {
    setIsProcessing(true);
    const ret =  await aesWorkerClient?.verifyAesProof(proof!);
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!ciphertext) {
    return null;
  }

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
        onClick={generateProof}
      >
        Generate Proof
      </button>
      {proof && (
        <>
          <div className="w-full flex items-center justify-center flex-wrap gap-4">
            <div className="mt-4 p-2 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold">Proof: </h2>
              <p className="text-gray-700 break-all">
                Proof is ready: See Console!
              </p>
            </div>
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center"
            onClick={verifyProof}
          >
            Verify Proof
          </button>
        </>
      )}

      {
        isProcessing && 
          <div className="flex items-center justify-center rounded-lg">
            <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full" />
          </div>
      }
    </>
  );
};

export default AesProofGenerator;
