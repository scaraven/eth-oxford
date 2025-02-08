import * as Comlink from "comlink";
import type { aesZKProgram as AESType } from "../../../../contracts/src/run";
import { encrypt } from "../../../../contracts/build/src/run";
import {
  bytes16ToString,
  stringToByte16,
  stringToByte16Array,
} from "../../utils/bytes";

const state = {
  AESInstance: null as null | typeof AESType,
};

interface Api {
  loadContract: () => Promise<void>;
  compileContract: () => Promise<void>;
  encrypt: (message: string, aesKey: string) => Promise<string>;
  decrypt: (message: string, aesKey: string) => Promise<string>;
}

export const api: Api = {
  async loadContract() {
    console.log("Loading the contract...");
    const { aesZKProgram: AES } = await import(
      "../../../../contracts/build/src/run"
    );
    state.AESInstance = AES;
  },

  async compileContract() {
    if (!state.AESInstance) {
      throw new Error("Contract not loaded");
    }
    // Idea: Use utils/openDB.ts to store the compiled contract

    console.log("Compiling the contract...");
    await state.AESInstance.compile({
      proofsEnabled: true,
    });
  },

  async encrypt(message: string, aesKey: string) {
    const messageBytes = stringToByte16(message);
    const aesKeyBytes = stringToByte16Array(aesKey);
    const bytes = encrypt(messageBytes, aesKeyBytes);
    console.log("Encrypted message:", bytes16ToString(bytes));
    return bytes16ToString(bytes);
  },

  async decrypt(message: string, aesKey: string) {
    return "Not implemented";
  },
};

Comlink.expose(api);

Comlink.expose(api);
