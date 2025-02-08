import { Field, MerkleList, method, SmartContract } from "o1js";
import { Byte16 } from "../primitives/Bytes";
import { sbox } from "./SBox";

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

    @method.returns(Byte16)
    async mixColumns(input: Byte16): Promise<Byte16> {
        return input;
    }
}

export { AES };