import * as Comlink from "comlink";
import type { aesZKProgram as AESType } from "../../../../contracts/src/run";
import { Mina, PublicKey, fetchAccount } from "o1js";
import { minaNetworkConfig } from "../../../minaNetwork.config";

const state = {
  AESInstance: null as null | typeof AESType,
  AESVerifierInstance: null as null | any,
  zkVerifierAppInstance: null as null | any,
};

interface Api {
  loadContracts: () => Promise<void>;
  compileAseContract: () => Promise<void>;

  setActiveInstanceToDevnet: () => Promise<void>;
  compileVerifierContract: () => Promise<void>;
  verifierInitAndFetch: () => Promise<void>;
  getAesProof: (message: string, aesKey: string) => Promise<void>;
  verifyAesProof: (
    proof: string,
    message: string,
    aesKey: string
  ) => Promise<string>;
}

export const api: Api = {
  async loadContracts() {
    console.log("Loading the contract...");
    const { aesZKProgram: AES } = await import(
      "../../../../contracts/build/src/run"
    );
    state.AESInstance = AES;

    const { AES: ASEVerifier } = await import(
      "../../../../contracts/build/src/AES/AES"
    );
    state.AESVerifierInstance = ASEVerifier;
  },

  async compileAseContract() {
    if (!state.AESInstance) {
      throw new Error("Contract not loaded");
    }
    // Idea: Use utils/openDB.ts to store the compiled contract

    console.log("Compiling the contract...");
    await state.AESInstance.compile({
      proofsEnabled: true,
    });
  },

  async getAesProof(message: string, aesKey: string) {},

  // Functions below are mostely used for verifier contract
  async setActiveInstanceToDevnet() {
    const Network = Mina.Network(minaNetworkConfig.networkUrl);
    console.log("Devnet network instance configured");
    Mina.setActiveInstance(Network);
  },

  async compileVerifierContract() {
    if (!state.AESVerifierInstance) {
      throw new Error("Contract not loaded");
    }

    console.log("Compiling the verifier contract...");
    await state.AESVerifierInstance.compile({
      proofsEnabled: true,
    });
  },

  async verifierInitAndFetch() {
    const publicKey58 = minaNetworkConfig.aesVerifierContractAddress;
    const publicKey = PublicKey.fromBase58(publicKey58);

    const accountRes = await fetchAccount({ publicKey });
    if (accountRes.error !== null) {
      alert("Failed to fetch account");
      throw new Error("Failed to fetch account");
    }

    state.zkVerifierAppInstance = new state.AESVerifierInstance!(publicKey);
  },

  async verifyAesProof(proof: string) {
    const transaction = await Mina.transaction(async () => {
      await state.zkVerifierAppInstance.verify({ proof });
    });

    await transaction.prove();
    return transaction.toJSON();
  },
};

Comlink.expose(api);
