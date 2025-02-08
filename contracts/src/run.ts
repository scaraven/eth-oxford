import { Bytes, Provable, ZkProgram } from 'o1js';
import { Byte16 } from './primitives/Bytes.js';
import { encrypt } from './AES/AES.js';

let aesZKProgram = ZkProgram({
  name: 'aes-verify',
  publicInput: Byte16,

  methods: {
    verifyAES128: {
      privateInputs: [Byte16, Byte16],

      async method(cipher: Byte16, message: Byte16, key: Byte16) {
        let out = encrypt(message, key);
        Provable.assertEqual(Byte16, out, cipher);
      },
    },
  },
});

let { verifyAES128 } = await aesZKProgram.analyzeMethods();

console.log(verifyAES128.summary());

console.time('compile');
const forceRecompileEnabled = false;
await aesZKProgram.compile({ forceRecompile: forceRecompileEnabled });
console.timeEnd('compile');

console.time('generate inputs');
const message = Byte16.fromBytes([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0xde, 0xad,
]);
const key = Byte16.fromBytes([
  0x01, 0xab, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78,
  0x9a, 0xbc, 0xff,
]);
const cipher = Byte16.fromBytes([
  0x9e, 0xd6, 0xb3, 0x12, 0x27, 0x48, 0xa0, 0x79, 0x98, 0xdf, 0x67, 0xf0, 0x41,
  0x32, 0x82, 0xb1,
]);
console.timeEnd('generate inputs');

console.time('prove');
let { proof } = await aesZKProgram.verifyAES128(message, key, cipher);
console.timeEnd('prove');

console.time('verify');
await aesZKProgram.verify(proof);
console.timeEnd('verify');
