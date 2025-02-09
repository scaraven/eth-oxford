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

  async loadContract() {
    return this.remoteApi.loadContract();
  }

  async compileContract() {
    return this.remoteApi.compileContract();
  }
}
