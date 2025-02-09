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
}
