import { Field, Struct } from 'o1js';

/**
 * A struct that represents 16 bytes packed into a single Field element.
 */
export class Byte16 extends Struct({
  value: Field
}) {
  // 2^128 as a Field constant for constraint checks
  static readonly TWO128 = Field(BigInt(1) << BigInt(128));

  constructor(value: Field) {
    super({ value });
    // Ensure the value is less than 2^128 to fit within 16 bytes
    value.assertLessThan(Byte16.TWO128);
  }

  /**
   * Converts an array of 16 bytes into a Byte16 instance.
   * @param bytes An array of 16 numbers, each between 0 and 255.
   * @returns A Byte16 instance.
   */
  static fromBytes(bytes: number[]): Byte16 {
    if (bytes.length !== 16) {
      throw new Error(`Expected 16 bytes, but got ${bytes.length}.`);
    }
    let combinedValue = BigInt(0);
    for (const byte of bytes) {
      if (byte < 0 || byte > 255) {
        throw new Error(`Byte value ${byte} is out of range. Must be between 0 and 255.`);
      }
      combinedValue = (combinedValue << BigInt(8)) | BigInt(byte);
    }
    return new Byte16(Field(combinedValue));
  }

  /**
   * Converts the Byte16 instance back into an array of 16 bytes.
   * @returns An array of 16 numbers, each between 0 and 255.
   */
  toBytes(): number[] {
    let value = this.value.toBigInt();
    const bytes = new Array<number>(16);
    for (let i = 15; i >= 0; i--) {
      bytes[i] = Number(value & BigInt(0xff));
      value >>= BigInt(8);
    }
    return bytes;
  }
}
