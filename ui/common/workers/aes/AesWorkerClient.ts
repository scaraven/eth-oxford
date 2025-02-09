import * as Comlink from "comlink";
import { Proof, SelfProof } from "o1js";
import { AESProof, AESPublicInput } from "../../../../contracts/build/src/AES/AES";

export default class AesWorkerClient {
  worker: Worker;
  remoteApi: Comlink.Remote<typeof import("./AesWorker").api>;

  constructor() {
    const worker = new Worker(new URL("./AesWorker.ts", import.meta.url), {
      type: "module",
    });
    this.remoteApi = Comlink.wrap(worker);
  }

  async loadContracts() {
    return this.remoteApi.loadContracts();
  }

  async compileAseContract() {
    return this.remoteApi.compileAseContract();
  }

  async getAesProof(message: string, ciphertext: string, aesKey: string) {
    return this.remoteApi.getAesProof(message, ciphertext, aesKey);
  }

  async verifyAesProof(proof: {
    proof: SelfProof<AESPublicInput, void>;
    auxiliaryOutput: undefined;
  }) {
    return this.remoteApi.verifyAesProof(proof);
  }

  async setActiveInstanceToDevnet() {
    return this.remoteApi.setActiveInstanceToDevnet();
  }

  async compileVerifierContract() {
    return this.remoteApi.compileVerifierContract();
  }

  async verifierInitAndFetch(publicKey58: string) {
    return this.remoteApi.verifierInitAndFetch(publicKey58);
  }
}
