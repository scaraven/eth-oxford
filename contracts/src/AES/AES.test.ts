import { AccountUpdate, Field, Mina, PrivateKey, PublicKey } from "o1js";
import { AES } from "./AES";
import { Byte16 } from "../primitives/Bytes";

let proofsEnabled = true;

describe("AES", () => {
    let deployerAccount: Mina.TestPublicKey,
    deployerKey: PrivateKey,
    senderAccount: Mina.TestPublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: AES;

  beforeAll(async () => {
    if (proofsEnabled) await AES.compile();
  });

  beforeEach(async () => {
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new AES(zkAppAddress);
  });

  it("generates correct key for 2 bytes input", async () => {
    const input = Byte16.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ,0x00, 0x00, 0xde, 0xad]);

    const num = await zkApp.sbox(input);
    expect(num.toField()).toEqual(Field(0x63636363636363636363636363631D95n));
  });

  it("generates correct key for 4 bytes input", async () => {
    const input = Byte16.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ,0xde, 0xad, 0xbe, 0xef]);
    const num = await zkApp.sbox(input);
    expect(num.toField()).toEqual(Field(0x6363636363636363636363631D95AEDFn));
  });

  it("generates correct key for 16 bytes input", async () => {
    const input = Byte16.fromBytes([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C ,0x0D, 0x0E, 0x0F, 0x10]);
    const num = await zkApp.sbox(input);
    expect(num.toField()).toEqual(Field(0x7C777BF26B6FC53001672BFED7AB76CAn));
  });

  it("test expected outcome of shiftRows", async () => {
    const input = Byte16.fromBytes([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C ,0x0D, 0x0E, 0x0F, 0x10]);
    const num = await zkApp.shiftRows(input);
    expect(num.toField().toBigInt().toString(16)).toEqual('1020304060708050b0c090a100d0e0f'); // quick hack for output in hex
  })

});

