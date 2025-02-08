import * as Comlink from "comlink";
// import type { AES } from "../../../../contracts/src/AES/AES";
import type { MyProgram } from "../../../../contracts/src/Example/Program";

const state = {
  AESInstance: null as null | typeof MyProgram,
};

interface Api {
  loadContract: () => Promise<void>;
  compileContract: () => Promise<void>;
  encrypt: (input: string) => Promise<string>;
  decrypt: (input: string) => Promise<string>;
}

export const api: Api = {
  async loadContract() {
    const { MyProgram } = await import(
      "../../../../contracts/build/src/Example/Program"
    ); //import("../../../../contracts/build/src/AES/AES.js");
    state.AESInstance = MyProgram;
  },

  async compileContract() {
    await state.AESInstance!.compile();
  },

  async encrypt(input: string) {
    return state.AESInstance!.baseCase().toString();
  },

  async decrypt(input: string) {
    return state.AESInstance!.baseCase().toString();
  },
};

Comlink.expose(api);
