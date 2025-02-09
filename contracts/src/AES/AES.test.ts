import { AccountUpdate, Field, Mina, PrivateKey, PublicKey } from "o1js";
import { AES, AESProof, AESPublicInput } from "./AES";
import { Byte16 } from "../primitives/Bytes";
import { FieldList } from "../utils/list";

let proofsEnabled = false;

describe('AES', () => {
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
    const Local = await Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    [deployerAccount, senderAccount] = Local.testAccounts;
    deployerKey = deployerAccount.key;
    senderKey = senderAccount.key;

    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new AES(zkAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, async () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      await zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  it('should accept dummy proof', async () => {
    await localDeploy();
    let dummy = await AESProof.dummy(new AESPublicInput({ cipher: new Byte16(Field(0), Field(0)) }), undefined, 1);
    await zkApp.verify(dummy);
  });
});
