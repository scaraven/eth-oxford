import { GRID_SIZES, ProcessType } from "../types";
import { useCallback } from "react";

const proccessingMethods = {
  encrypt: {
    custom: (message: string, aseKey: string) => {
      return message.split("").reverse().join("");
    },

    expected: (message: string, aseKey: string) => {
      return "I should be the expected value";
    },
  },

  decrypt: {
    custom: (message: string, aseKey: string) => {
      return message.split("").reverse().join("");
    },

    expected: (message: string, aseKey: string) => {
      return "I should be the expected value";
    },
  },
};

type ReturnType = {
  custom: (message: string, aseKey: string) => string;
  expected: (message: string, aseKey: string) => string;
};

const useMessageProcessing = (type: ProcessType): ReturnType => {
  if (!proccessingMethods[type]) {
    throw new Error("Invalid process type");
  }

  const processingMethod = useCallback(
    (message: string, aseKey: string) => {
      const dimension = Math.sqrt(message.length);
      if (
        dimension ** 2 !== message.length &&
        !GRID_SIZES.includes(dimension)
      ) {
        throw new Error("Message length must match the grid dimension squared");
      }

      if (aseKey.length !== 32) {
        throw new Error("AES key must be 32 characters long");
      }

      console.log("Processing message", message, aseKey);

      return proccessingMethods[type].custom(message, aseKey);
    },
    [type]
  );

  return {
    custom: processingMethod,
    expected: proccessingMethods[type].expected, // This should throw errors on its own
  };
};

export default useMessageProcessing;
