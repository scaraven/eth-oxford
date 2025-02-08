import { Field, Struct, Gadgets } from 'o1js';

/**
 * A struct that represents 16 bytes packed into a single Field element.
 */
export class Byte16 extends Struct({
  top: Field,
  bot: Field
}) {
  // 2^128 as a Field constant for constraint checks
  static readonly TWO64 = Field(BigInt(1) << BigInt(64));

  constructor(top: Field, bot: Field) {
    super({ top, bot });
    // Ensure each section is less than 2^64 to fit within 8 bytes
    top.assertLessThan(Byte16.TWO64);
    bot.assertLessThan(Byte16.TWO64);
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
    let top = BigInt(0);
    let bot = BigInt(0);
    for (let i = 0; i < 16; i++) {
      let byte = bytes[i];
      if (byte < 0 || byte > 255) {
        throw new Error(`Byte value ${byte} is out of range. Must be between 0 and 255.`);
      }

      if (i < 8) {
        top = (top << BigInt(8)) | BigInt(byte);
      } else {
        bot = (bot << BigInt(8)) | BigInt(byte);
      }
    }
    return new Byte16(Field(top), Field(bot));
  }

  /**
   * Converts the Byte16 instance back into an array of 16 bytes.
   * @returns An array of 16 numbers, each between 0 and 255.
   */
  toBytes(): number[] {
    let top = this.top.toBigInt();
    let bot = this.bot.toBigInt();
    const bytes = new Array<number>(16);
    for (let i = 15; i >= 0; i--) {
      if (i < 8) {
        bytes[i] = Number(top & BigInt(0xff));
        top >>= BigInt(8);
      } else {
        bytes[i] = Number(bot & BigInt(0xff));
        bot >>= BigInt(8);
      }
    }
    return bytes;
  }

  toField(): Field {
    return this.bot.add(this.top.mul(Byte16.TWO64));
  }

  /**
   * Perform XOR operation between two Byte values.
   * @param a First Byte struct.
   * @param b Second Byte struct.
   * @returns A new Byte struct representing the XOR result.
   */
  static xor(a: Byte16, b: Byte16): Byte16 {
    // AES uses 128 bit sizes for all operations
    return new Byte16(Gadgets.xor(a.top, b.top, 64), Gadgets.xor(a.bot, b.bot, 64));
  }
}
