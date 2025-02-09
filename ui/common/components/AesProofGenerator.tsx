import React, { useState } from "react";

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
  const [proof, setProof] = useState<string | undefined>(undefined);

  const generateProof = () => {
    setProof("proof");
  };

  const verifyProof = () => {
    // Run proof verification passing the proof to the virefier contract
  };

  if (false && isLoading) {
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
              <p className="text-gray-700 break-all">{proof}</p>
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
    </>
  );
};

export default AesProofGenerator;
