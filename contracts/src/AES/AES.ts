import { method, SmartContract } from "o1js";
import { Byte16 } from "../primitives/Bytes";
import { sbox } from "./SBox";
import { shiftRows } from "./ShiftRows"


class AES extends SmartContract {
  @method.returns(Byte16)
  async encrypt(input: Byte16): Promise<Byte16> {
    return input;
  }

  @method.returns(Byte16)
  async decrypt(input: Byte16): Promise<Byte16> {
    return input;
  }

<<<<<<< Updated upstream
    @method.returns(Byte16)
    async sbox(input: Byte16): Promise<Byte16> {
        // Get top 64 bits
        const enc_top = sbox(input.top);
        const enc_bot = sbox(input.bot);
=======
  @method.returns(Byte16)
  async sbox(input: Byte16): Promise<Byte16> {
    // Get top 64 bits

    const enc_top = sbox(input.top);
    const enc_bot = sbox(input.bot);
>>>>>>> Stashed changes

    return new Byte16(enc_top, enc_bot);
  }

<<<<<<< Updated upstream
    @method.returns(Byte16)
    async mixColumns(input: Byte16): Promise<Byte16> {
        return input;
    }
    
    @method.returns(Byte16)
    async shiftRows(input: Byte16): Promise<Byte16> {
        return shiftRows(input);
    }
=======
  @method.returns(Byte16)
  async shiftRows(input: Byte16): Promise<Byte16> {
    return shiftRows(input);
  }
>>>>>>> Stashed changes
}

export { AES };
