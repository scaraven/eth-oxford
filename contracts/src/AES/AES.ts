import { Proof, SmartContract, Struct } from "o1js";
import { Byte16 } from "../primitives/Bytes.js";

class AESProof extends Proof<AESPublicInput, void> {};

class AESPublicInput extends Struct({
    cipher: Byte16,
  }) {}

class AES extends SmartContract {

  async verify(input: AESProof) {
    input.verify();
  }
}

export { AES, AESProof, AESPublicInput};
