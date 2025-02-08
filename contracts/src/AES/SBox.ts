import { Field, Gadgets, Provable, Struct } from "o1js";

class SBoxArr extends Struct({
    value: Provable.Array(Field, 256)
}) {}

const sbox_arr = [
    Field(0x63), Field(0x7C), Field(0x77), Field(0x7B), Field(0xF2), Field(0x6B), Field(0x6F), Field(0xC5), Field(0x30), Field(0x01), Field(0x67), Field(0x2B), Field(0xFE), Field(0xD7), Field(0xAB), Field(0x76),
    Field(0xCA), Field(0x82), Field(0xC9), Field(0x7D), Field(0xFA), Field(0x59), Field(0x47), Field(0xF0), Field(0xAD), Field(0xD4), Field(0xA2), Field(0xAF), Field(0x9C), Field(0xA4), Field(0x72), Field(0xC0),
    Field(0xB7), Field(0xFD), Field(0x93), Field(0x26), Field(0x36), Field(0x3F), Field(0xF7), Field(0xCC), Field(0x34), Field(0xA5), Field(0xE5), Field(0xF1), Field(0x71), Field(0xD8), Field(0x31), Field(0x15),
    Field(0x04), Field(0xC7), Field(0x23), Field(0xC3), Field(0x18), Field(0x96), Field(0x05), Field(0x9A), Field(0x07), Field(0x12), Field(0x80), Field(0xE2), Field(0xEB), Field(0x27), Field(0xB2), Field(0x75),
    Field(0x09), Field(0x83), Field(0x2C), Field(0x1A), Field(0x1B), Field(0x6E), Field(0x5A), Field(0xA0), Field(0x52), Field(0x3B), Field(0xD6), Field(0xB3), Field(0x29), Field(0xE3), Field(0x2F), Field(0x84),
    Field(0x53), Field(0xD1), Field(0x00), Field(0xED), Field(0x20), Field(0xFC), Field(0xB1), Field(0x5B), Field(0x6A), Field(0xCB), Field(0xBE), Field(0x39), Field(0x4A), Field(0x4C), Field(0x58), Field(0xCF),
    Field(0xD0), Field(0xEF), Field(0xAA), Field(0xFB), Field(0x43), Field(0x4D), Field(0x33), Field(0x85), Field(0x45), Field(0xF9), Field(0x02), Field(0x7F), Field(0x50), Field(0x3C), Field(0x9F), Field(0xA8),
    Field(0x51), Field(0xA3), Field(0x40), Field(0x8F), Field(0x92), Field(0x9D), Field(0x38), Field(0xF5), Field(0xBC), Field(0xB6), Field(0xDA), Field(0x21), Field(0x10), Field(0xFF), Field(0xF3), Field(0xD2),
    Field(0xCD), Field(0x0C), Field(0x13), Field(0xEC), Field(0x5F), Field(0x97), Field(0x44), Field(0x17), Field(0xC4), Field(0xA7), Field(0x7E), Field(0x3D), Field(0x64), Field(0x5D), Field(0x19), Field(0x73),
    Field(0x60), Field(0x81), Field(0x4F), Field(0xDC), Field(0x22), Field(0x2A), Field(0x90), Field(0x88), Field(0x46), Field(0xEE), Field(0xB8), Field(0x14), Field(0xDE), Field(0x5E), Field(0x0B), Field(0xDB),
    Field(0xE0), Field(0x32), Field(0x3A), Field(0x0A), Field(0x49), Field(0x06), Field(0x24), Field(0x5C), Field(0xC2), Field(0xD3), Field(0xAC), Field(0x62), Field(0x91), Field(0x95), Field(0xE4), Field(0x79),
    Field(0xE7), Field(0xC8), Field(0x37), Field(0x6D), Field(0x8D), Field(0xD5), Field(0x4E), Field(0xA9), Field(0x6C), Field(0x56), Field(0xF4), Field(0xEA), Field(0x65), Field(0x7A), Field(0xAE), Field(0x08),
    Field(0xBA), Field(0x78), Field(0x25), Field(0x2E), Field(0x1C), Field(0xA6), Field(0xB4), Field(0xC6), Field(0xE8), Field(0xDD), Field(0x74), Field(0x1F), Field(0x4B), Field(0xBD), Field(0x8B), Field(0x8A),
    Field(0x70), Field(0x3E), Field(0xB5), Field(0x66), Field(0x48), Field(0x03), Field(0xF6), Field(0x0E), Field(0x61), Field(0x35), Field(0x57), Field(0xB9), Field(0x86), Field(0xC1), Field(0x1D), Field(0x9E),
    Field(0xE1), Field(0xF8), Field(0x98), Field(0x11), Field(0x69), Field(0xD9), Field(0x8E), Field(0x94), Field(0x9B), Field(0x1E), Field(0x87), Field(0xE9), Field(0xCE), Field(0x55), Field(0x28), Field(0xDF),
    Field(0x8C), Field(0xA1), Field(0x89), Field(0x0D), Field(0xBF), Field(0xE6), Field(0x42), Field(0x68), Field(0x41), Field(0x99), Field(0x2D), Field(0x0F), Field(0xB0), Field(0x54), Field(0xBB), Field(0x16)
];

function sbox(input: Field): Field {
    let output: Field = Field(0);

    let sbox = new SBoxArr({ value: sbox_arr });

    for (let i = 0; i < 8; i++) {
        // Take the corresponding byte from 
        // Apply the S-box to each byte of the input
        let shifted = Gadgets.rightShift64(input, i * 8)
        let byte = Gadgets.and(shifted, Field(0xff), 64);
        let byte_output = Field(0);

        for (let j = 0; j < 256; j++) {
            // This is either 0 or 1, depending on whether we have accessed the correct index
            let correct_index = byte.equals(Field(j)).toField();
            byte_output = byte_output.add(sbox.value[j].mul(correct_index));
        }
        // Transform byte_output to the correct position
        byte_output = Gadgets.leftShift64(byte_output, i * 8);
        output = output.add(byte_output);
    }

    return output;
}


export { sbox };