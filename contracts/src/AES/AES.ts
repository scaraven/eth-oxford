import { Field, MerkleList, method, SmartContract } from "o1js";
import { Byte16 } from "../primitives/Bytes";
import { sbox } from "./SBox";
import { shiftRows } from "./ShiftRows"
import { FieldList } from "../utils/list";
import { gmixColumn } from "./MixColumns";

function encrypt(message: Byte16, key: Byte16) {
    return message;
}

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
    // Get top 64 bits
    const enc_top = sbox(input.top);
    const enc_bot = sbox(input.bot);

    return new Byte16(enc_top, enc_bot);
  }

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

export { AES, encrypt };
