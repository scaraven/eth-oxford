import { Byte16 } from "../../../contracts/build/src/primitives/Bytes";
import { encrypt } from "../../../contracts/build/src/run";
import { bytes16ToString, stringToByte16, stringToByte16Array } from "./bytes";

async function minaEncrypt(message: string, aesKey: string): Promise<string> {
  const messageBytes: Byte16 = stringToByte16(message);
  const aesKeyBytes = stringToByte16Array(aesKey);

  console.log("CryptoMina: Message bytes:", messageBytes);
  console.log("CryptoMina: AES key bytes:", aesKeyBytes);
  console.log("CryptoMina: Encrypting message:", message);

  const bytes = encrypt(messageBytes, aesKeyBytes);

  console.log("CryptoMina: Encrypted message:", bytes16ToString(bytes));
  return bytes16ToString(bytes);
}

async function minaDecrypt(message: string, aesKey: string) {
  return "Not implemented";
}

export { minaEncrypt, minaDecrypt };
