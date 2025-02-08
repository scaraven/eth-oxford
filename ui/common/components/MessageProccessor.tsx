"use client";
import React, { useState } from "react";
import GridDiagram from "./GridDiagram";
import { GridDimension } from "../types";
import KeyGen, { generateRandomKey } from "./KeyGen";
import { useAesProof } from "../context/aesProofContext";

type Props = {
  title: string;
  buttonText: string;
  processType: "encrypt" | "decrypt";
  bgClass?: string;
};

const MessageProcessor: React.FC<Props> = ({
  title,
  buttonText,
  processType,
  bgClass = "bg-blue-200",
}) => {
  const [message, setMessage] = useState<string>("");
  const [dimension, setDimension] = useState<GridDimension>(4);
  const [processedMessage, setProcessedMessage] = useState<string>("");
  const [aesKey, setAesKey] = useState<string>(generateRandomKey());
  const { getEncryptionProof, getDecryptionProof, isLoading } = useAesProof();

  const handleProcess = () => {
    if (message.length !== dimension ** 2) {
      alert("Message length must match the grid dimension squared");
      return;
    }

    if (aesKey.length !== 32) {
      alert("AES key must be 32 characters long");
      return;
    }

    const newMessage = message;
    console.log(newMessage);
    setProcessedMessage(newMessage);
  };

  return (
    <div
      className={`relative mb-6 flex flex-col items-center gap-4 p-4 ${bgClass} rounded-lg shadow-md w-full`}
    >
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      {isLoading && (
        <div className="flex items-center justify-center rounded-lg">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <KeyGen aesKey={aesKey} setAesKey={setAesKey} />
          <h3 className="text-lg font-semibold text-center">
            Enter the message below:
          </h3>
          <GridDiagram
            message={message}
            setMessage={setMessage}
            dimension={dimension}
            setDimension={setDimension}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
            onClick={handleProcess}
            disabled={isLoading}
          >
            {buttonText}
          </button>
          {processedMessage && (
            <div className="w-full flex items-center justify-center flex-wrap gap-4">
              <div className="mt-4 p-2 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-lg font-semibold">Processed Message</h2>
                <p className="text-gray-700 break-all">{processedMessage}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageProcessor;
