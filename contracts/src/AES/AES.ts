import { Field, method, Proof, SmartContract, Struct } from "o1js";
import { Byte16 } from "../primitives/Bytes.js";
import { sbox } from "./SBox.js";
import { shiftRows } from "./ShiftRows.js"
import { FieldList } from "../utils/list.js";
import { gmixColumn, mixColumn } from "./MixColumns.js";

class AESProof extends Proof<Byte16, Byte16> {};

class AES extends SmartContract {
  // Add a dummy method so that the program compiles when proofs are enabled
  @method
  async dummy() {
    // This method does nothing. It exists only to satisfy the requirement for at least one method.
    Field(0).assertEquals(Field(0));
  }
  // @method
  async verify(input: AESProof) {
    input.verify();
  }

  @method.returns(Byte16)
  async decrypt(input: Byte16): Promise<Byte16> {
    return input;
  }

  @method.returns(Byte16)
  async sbox(input: Byte16): Promise<Byte16> {
    return sbox(input);
  }

    @method.returns(Byte16)
    async mixColumns(input: Byte16): Promise<Byte16> {
        return mixColumn(input);
    }
    
    @method.returns(Byte16)
    async shiftRows(input: Byte16): Promise<Byte16> {
        return shiftRows(input);
    }
}

export { AES, AESProof };
