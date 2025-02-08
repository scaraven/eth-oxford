import { Field, method, SmartContract } from "o1js";
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
        return sbox(input.value);
    }
}

export { AES };