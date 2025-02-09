import { method, Proof, SelfProof, SmartContract, Struct } from 'o1js';
import { Byte16 } from '../primitives/Bytes.js';

class AESProof extends Proof<AESPublicInput, void> {}

class AESPublicInput extends Struct({
  cipher: Byte16,
}) {}

class AES extends SmartContract {
  @method async verify(input: SelfProof<AESPublicInput, void>) {
    input.verify();
  }
}

export { AES, AESProof, AESPublicInput };
