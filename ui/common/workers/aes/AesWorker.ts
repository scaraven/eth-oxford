import * as Comlink from "comlink";
import { aesZKProgram, encrypt, encryptStageOne, type aesZKProgram as AESType } from "../../../../contracts/build/src/run";
import { Mina, Proof, PublicKey, SelfProof, fetchAccount } from "o1js";
import { minaNetworkConfig } from "../../../minaNetwork.config";
import { stringToByte16, stringToByte16Array } from "../../utils/bytes";
import { AESProof, AESPublicInput } from "../../../../contracts/build/src/AES/AES";

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
  verifierInitAndFetch: (publicKey58: string) => Promise<void>;
  getAesProof: (
    message: string,
    ciphertext: string,
    aesKey: string
  ) => Promise<{
    proof: SelfProof<AESPublicInput, void>;
    auxiliaryOutput: undefined;
  }>;
  verifyAesProof: (proof: {
    proof: SelfProof<AESPublicInput, void>;
    auxiliaryOutput: undefined;
  }) => Promise<string>;
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

  async getAesProof(message: string, ciphertext: string, aesKey: string) {
    if (!state.AESInstance) {
      throw new Error("Contract not loaded");
    }

    console.log("Generating proof...");
    const partial_output = encryptStageOne(stringToByte16(message), stringToByte16Array(aesKey));
    const proof = await state.AESInstance.verifyAES128Partial(
      {
        cipher: stringToByte16(ciphertext),
      },
      partial_output,
      stringToByte16Array(aesKey)
    );

    console.log("Mina Proof: ", proof.proof);

    return proof;
  },

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

  async verifierInitAndFetch(publicKey58: string) {
    console.log("Initializing verifier contract...");
    // const publicKey = PublicKey.fromBase58(publicKey58);

    const accountRes = await fetchAccount({ publicKey: publicKey58 });
    console.log(accountRes)
    if (accountRes.error !== null) {
      console.log("Failed to fetch account :(");
      throw new Error("Failed to fetch account");
    }

    const contractAddress = PublicKey.fromBase58(
      minaNetworkConfig.aesVerifierContractAddress
    );
    state.zkVerifierAppInstance = new state.AESVerifierInstance!(
      contractAddress
    );
  },

  async verifyAesProof(proof: {
    proof: SelfProof<AESPublicInput, void>;
    auxiliaryOutput: undefined;
  }): Promise<string> {
    await aesZKProgram.verify(proof.proof);
    return "Proof verified successfully";
  },
};

Comlink.expose(api);
