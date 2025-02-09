import * as Comlink from "comlink";

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

  async getAesProof(message: string, aesKey: string) {
    return this.remoteApi.getAesProof(message, aesKey);
  }

  async verifyAesProof(proof: string, message: string, aesKey: string) {
    return this.remoteApi.verifyAesProof(proof, message, aesKey);
  }

  async setActiveInstanceToDevnet() {
    return this.remoteApi.setActiveInstanceToDevnet();
  }

  async compileVerifierContract() {
    return this.remoteApi.compileVerifierContract();
  }

  async verifierInitAndFetch() {
    return this.remoteApi.verifierInitAndFetch();
  }
}
