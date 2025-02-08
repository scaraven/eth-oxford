import * as Comlink from "comlink";
// import type { AES } from "../../../../contracts/src/AES/AES";
import type { MyProgram } from "../../../../contracts/src/Example/Program";

const state = {
  AESInstance: null as null | typeof MyProgram,
};

interface Api {
  loadContract: () => Promise<void>;
  compileContract: () => void;
  encrypt: (message: string, aesKey: string) => Promise<string>;
  decrypt: (message: string, aesKey: string) => Promise<string>;
}

export const api: Api = {
  async loadContract() {
    const { MyProgram } = await import(
      "../../../../contracts/build/src/Example/Program"
    ); //import("../../../../contracts/build/src/AES/AES.js");
    state.AESInstance = MyProgram;
  },

  async compileContract() {
    if (!state.AESInstance) {
      throw new Error("Contract not loaded");
    }
    await state.AESInstance.compile({ proofsEnabled: true });
  },

  async encrypt(message: string, aesKey: string) {
    return state.AESInstance!.baseCase().toString();
  },

  async decrypt(message: string, aesKey: string) {
    return state.AESInstance!.baseCase().toString();
  },
};

Comlink.expose(api);
