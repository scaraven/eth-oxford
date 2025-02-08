import { method, SmartContract } from "o1js";
import { Byte16 } from "./Bytes";

class AES extends SmartContract {
    @method.returns(Byte16)
    async encrypt(input: Byte16): Promise<Byte16> {
        return input;
    }

    @method.returns(Byte16)
    async decrypt(input: Byte16): Promise<Byte16> {
        return input;
    }
}