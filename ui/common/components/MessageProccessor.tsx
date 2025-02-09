"use client";
import React, { useMemo, useState } from "react";
import GridDiagram from "./GridDiagram";
import { GridDimension } from "../types";
import KeyGen, { generateRandomKey } from "./KeyGen";
import { useAesProof } from "../context/aesProofContext";
import { minaEncrypt, minaDecrypt } from "../utils/cryptoMina";
import AesProofGenerator from "./AesProofGenerator";

type Props = {
  processType: "encrypt" | "decrypt";
};

const MessageProcessor: React.FC<Props> = ({ processType }) => {
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dimension, setDimension] = useState<GridDimension>(4);
  const [processedMessage, setProcessedMessage] = useState<string>("");
  const [aesKey, setAesKey] = useState<string>(generateRandomKey());
  const { isLoading } = useAesProof();

  const { title, buttonText, bgClass } = useMemo(() => {
    if (processType == "encrypt") {
      return {
        title: "AES Encryption",
        buttonText: "Encrypt",
        bgClass: "bg-blue-200",
      };
    } else {
      return {
        title: "AES Decryption",
        buttonText: "Decrypt",
        bgClass: "bg-teal-100",
      };
    }
  }, [processType]);

  const handleProcess = async () => {
    setIsProcessing(true);
    if (message.length !== dimension ** 2) {
      alert("Message length must match the grid dimension squared");
      return;
    }

    if (aesKey.length !== 16) {
      alert("AES key must be 16 characters long");
      return;
    }

    const proccessFunction =
      processType === "encrypt" ? minaEncrypt : minaDecrypt;

    console.log("Processing message...");
    try {
      const newMessage = await proccessFunction(message, aesKey);
      setProcessedMessage(newMessage);
    } catch (err) {
      console.error(err);
      alert("Failed to process message");
    }
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div
      className={`relative mb-6 flex flex-col items-center gap-4 p-4 ${bgClass} rounded-lg shadow-md w-full`}
    >
      <h1 className="text-2xl font-bold text-center">{title}</h1>
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
      {isProcessing ? (
        <div className="flex items-center justify-center rounded-lg">
          <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
          onClick={handleProcess}
        >
          {buttonText}
        </button>
      )}
      {processedMessage && !isProcessing && (
        <div className="w-full flex items-center justify-center flex-wrap gap-4">
          <div className="mt-4 p-2 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Processed Message: </h2>
            <p className="text-gray-700 break-all">{processedMessage}</p>
          </div>
        </div>
      )}
      <AesProofGenerator // TODO: Add a corresponding component for decryption
        message={message}
        ciphertext={processedMessage}
        aesKey={aesKey}
        isLoading={isLoading || isProcessing}
      />
    </div>
  );
};

export default MessageProcessor;
