import * as Comlink from "comlink";
import type { aesZKProgram as AESType } from "../../../../contracts/src/run";

const state = {
  AESInstance: null as null | typeof AESType,
};

interface Api {
  loadContract: () => Promise<void>;
  compileContract: () => Promise<void>;
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
};

Comlink.expose(api);
