import { Byte16 } from "../../../contracts/build/src/primitives/Bytes";

const assert = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(message);
  }
};

export function stringToByte16(str: string): Byte16 {
  // Convert string to Byte16
  // Implementation depends on the definition of Byte16
  assert(str.length === 16, "String must be 16 characters long");
  const bytes: number[] = Array(16).fill(0);

  for (let i = 0; i < 16; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  console.log(bytes.length);
  return Byte16.fromBytes(bytes);
}

export function stringToByte16Array(str: string): Byte16[] {
  // Convert string to Byte16 array
  // Implementation depends on the definition of Byte16
  assert(str.length === 16, "String must be 16 characters long");
  const n = 11;
  const bytesArr: Byte16[] = Array.from({ length: n }, () =>
    stringToByte16(str)
  );

  return bytesArr;
}

export function bytes16ToString(bytes: Byte16): string {
  // Convert Byte16 to string
  // Implementation depends on the definition of Byte16
  const arr = bytes.toBytes();
  return String.fromCharCode(...arr);
}
