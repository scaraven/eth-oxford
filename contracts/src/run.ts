import { Provable, Struct, ZkProgram } from 'o1js';
import { Byte16 } from './primitives/Bytes.js';
import { addRoundKey } from './AES/AddRoundKey.js';
import { shiftRows } from './AES/ShiftRows.js';
import { sbox } from './AES/SBox.js';
import { mixColumn } from './AES/MixColumns.js';
import { AESPublicInput } from './AES/AES.js';

const NUM_ROUNDS = 10;

export function encrypt(message: Byte16, key: Byte16[]): Byte16 {
  let state = message;

  state = addRoundKey(state, key[0]);

  for (let i = 1; i < NUM_ROUNDS; i++) {
    state = sbox(state);
    state = shiftRows(state);
    state = mixColumn(state);
    state = addRoundKey(state, key[i]);
  }
  state = sbox(state);
  state = shiftRows(state);
  state = addRoundKey(state, key[NUM_ROUNDS]);

  return state;
}

function encryptStageOne(message: Byte16, key: Byte16[]): Byte16 {
  let state = message;

  state = addRoundKey(state, key[0]);

  for (let i = 1; i < NUM_ROUNDS - 1; i++) {
    state = sbox(state);
    state = shiftRows(state);
    state = mixColumn(state);
    state = addRoundKey(state, key[i]);
  }

  return state;
}

function encryptStageTwo(message: Byte16, key: Byte16[]): Byte16 {
  let state = message;

  for (let i = NUM_ROUNDS - 1; i < NUM_ROUNDS; i++) {
    state = sbox(state);
    state = shiftRows(state);
    state = mixColumn(state);
    state = addRoundKey(state, key[i]);
  }

  state = sbox(state);
  state = shiftRows(state);
  state = addRoundKey(state, key[NUM_ROUNDS]);

  return state;
}

let aesZKProgram = ZkProgram({
  name: 'aes-verify',
  publicInput: AESPublicInput,

  methods: {
    verifyAES128Partial: {
      privateInputs: [Byte16, Provable.Array(Byte16, NUM_ROUNDS + 1)],

      async method(input: AESPublicInput, message: Byte16, roundKeys: Byte16[]) {
        let state = encryptStageTwo(message, roundKeys);

        return state.assertEquals(input.cipher);
      },
    },
  },
});

let { verifyAES128Partial } = await aesZKProgram.analyzeMethods();

console.log(verifyAES128Partial.summary());

console.time('compile');
const forceRecompileEnabled = false;
await aesZKProgram.compile({ forceRecompile: forceRecompileEnabled });
console.timeEnd('compile');

console.time('generate inputs');
const message = Byte16.fromBytes([
  0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36
]);
const key = [
  Byte16.fromBytes([0x5f, 0x75, 0xe5, 0x00, 0xa8, 0x63, 0x31, 0x6b, 0xbb, 0x67, 0xa8, 0x3d, 0x54, 0xcb, 0x7a, 0xa0]),
  Byte16.fromBytes([0x41, 0xaf, 0x05, 0x20, 0xe9, 0xcc, 0x34, 0x4b, 0x52, 0xab, 0x9c, 0x76, 0x06, 0x60, 0xe6, 0xd6]),
  Byte16.fromBytes([0x93, 0x21, 0xf3, 0x4f, 0x7a, 0xed, 0xc7, 0x04, 0x28, 0x46, 0x5b, 0x72, 0x2e, 0x26, 0xbd, 0xa4]),
  Byte16.fromBytes([0x60, 0x5b, 0xba, 0x7e, 0x1a, 0xb6, 0x7d, 0x7a, 0x32, 0xf0, 0x26, 0x08, 0x1c, 0xd6, 0x9b, 0xac]),
  Byte16.fromBytes([0x9e, 0x4f, 0x2b, 0xe2, 0x84, 0xf9, 0x56, 0x98, 0xb6, 0x09, 0x70, 0x90, 0xaa, 0xdf, 0xeb, 0x3c]),
  Byte16.fromBytes([0x10, 0xa6, 0xc0, 0x4e, 0x94, 0x5f, 0x96, 0xd6, 0x22, 0x56, 0xe6, 0x46, 0x88, 0x89, 0x0d, 0x7a]),
  Byte16.fromBytes([0x97, 0x71, 0x1a, 0x8a, 0x03, 0x2e, 0x8c, 0x5c, 0x21, 0x78, 0x6a, 0x1a, 0xa9, 0xf1, 0x67, 0x60]),
  Byte16.fromBytes([0x76, 0xf4, 0xca, 0x59, 0x75, 0xda, 0x46, 0x05, 0x54, 0xa2, 0x2c, 0x1f, 0xfd, 0x53, 0x4b, 0x7f]),
  Byte16.fromBytes([0x1b, 0x47, 0x18, 0x0d, 0x6e, 0x9d, 0x5e, 0x08, 0x3a, 0x3f, 0x72, 0x17, 0xc7, 0x6c, 0x39, 0x68]),
  Byte16.fromBytes([0x50, 0x55, 0x5d, 0xcb, 0x3e, 0xc8, 0x03, 0xc3, 0x04, 0xf7, 0x71, 0xd4, 0xc3, 0x9b, 0x48, 0xbc]),
  Byte16.fromBytes([0x72, 0x07, 0x38, 0xe5, 0x4c, 0xcf, 0x3b, 0x26, 0x48, 0x38, 0x4a, 0xf2, 0x8b, 0xa3, 0x02, 0x4e])
]

const cipher = encrypt(message, key);

/*const cipher = Byte16.fromBytes([
  0x9e, 0xd6, 0xb3, 0x12, 0x27, 0x48, 0xa0, 0x79, 0x98, 0xdf, 0x67, 0xf0, 0x41,
  0x32, 0x82, 0xb1,
]);*/
console.timeEnd('generate inputs');

console.time('out of circuit proof');
let partial_output = encryptStageOne(message, key);
console.timeEnd('out of circuit proof');

console.time('prove');
let { proof } = await aesZKProgram.verifyAES128Partial(new AESPublicInput({ cipher }), partial_output, key);
console.timeEnd('prove');

console.log("Mina Proof: ", proof);

console.time('verify');
await aesZKProgram.verify(proof);
console.timeEnd('verify');

