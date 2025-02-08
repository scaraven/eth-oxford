import * as Comlink from "comlink";
// import type { AES } from "../../../../contracts/src/AES/AES";
import { MyProgram } from "../../../../contracts/build/src/Example/Program.js";

const state = {
  AESInstance: MyProgram,
};

interface Api {
  compileContract: () => void;
  encrypt: (message: string, aesKey: string) => Promise<string>;
  decrypt: (message: string, aesKey: string) => Promise<string>;
}

export const api: Api = {
  async compileContract() {
    await state.AESInstance.compile();
  },

  async encrypt(message: string, aesKey: string) {
    return state.AESInstance!.baseCase().toString();
  },

  async decrypt(message: string, aesKey: string) {
    return state.AESInstance!.baseCase().toString();
  },
};

Comlink.expose(api);
