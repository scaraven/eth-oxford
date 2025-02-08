import { Byte16 } from "../primitives/Bytes";

function AddRoundKey(input: Byte16, key: Byte16): Byte16 {
  return Byte16.xor(input, key);
}