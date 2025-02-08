import { method, Proof, SmartContract } from "o1js";
import { Byte16 } from "../primitives/Bytes.js";
import { sbox } from "./SBox.js";
import { shiftRows } from "./ShiftRows.js"
import { FieldList } from "../utils/list.js";
import { gmixColumn } from "./MixColumns.js";

class AESProof extends Proof<Byte16, Byte16> {};

class AES extends SmartContract {

  @method.returns(Byte16)
  async encrypt(input: Byte16): Promise<Byte16> {
    return input;
  }

  @method.returns(Byte16)
  async decrypt(input: Byte16): Promise<Byte16> {
    return input;
  }

  @method.returns(Byte16)
  async sbox(input: Byte16): Promise<Byte16> {
    return sbox(input);
  }

    // TODO: Not correct
    @method.returns(FieldList)
    async mixColumns(input: Byte16): Promise<FieldList> {
        let list = FieldList.empty();
        list.push(input.top);
        list.push(input.bot);
        return gmixColumn(list);
    }
    
    @method.returns(Byte16)
    async shiftRows(input: Byte16): Promise<Byte16> {
        return shiftRows(input);
    }
}

export { AES, AESProof };
