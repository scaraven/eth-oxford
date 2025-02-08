import { Circuit, Field, Gadgets, Bool, circuitMain, Provable } from "o1js";
import { Byte16 } from "../primitives/Bytes"

function MixColumnSingle(a: Field, b: Field, c: Field, d: Field): Field {
    return Field(0);
}

function xor8(a: Field, b: Field): Field {
    return Gadgets.xor(a, b, 8);
}

function xor8_5(a: Field, b: Field, c: Field, d: Field, e: Field): Field {
    return xor8(xor8(xor8(xor8(a, b), c), d), e);
}

// TODO: Modify Field[] into MerkleListBase
export function gmixColumn(r: Field[]): Field[] {
    if (r.length !== 4) {
      throw new Error('gmixColumn: expected array of 4 bytes');
    }
    let a: Field[] = [];
    let b: Field[] = [];
    
    // Process each byte in the column.
    for (let c = 0; c < 4; c++) {
      r[c].assertLessThanOrEqual(Field(0xff));
      
      a.push(r[c]);
        
      // Compute h = r[c] & 0x80.
      const h = Gadgets.and(r[c], Field(0x80), 8).equals(Field(0x80));
      
      // Compute b[c] = r[c] << 1, i.e. multiply by 2.
      let b_val = Gadgets.leftShift32(r[c], 1);

      // TODO: zk magic to prevent inflating circuit
      b_val = Provable.if(h, Gadgets.xor(b_val, Field(0x1B), 8), b_val);
    
      b.push(Gadgets.and(b_val, Field(0xff), 8));
    }
    
    // Now compute the new column bytes.
    // The C code uses XOR (^) to combine values.
    // We assume our helper xor8 (and xor8_5) performs an 8-bit XOR.
    const r0 = xor8_5(b[0], a[3], a[2], b[1], a[1]);
    const r1 = xor8_5(b[1], a[0], a[3], b[2], a[2]);
    const r2 = xor8_5(b[2], a[1], a[0], b[3], a[3]);
    const r3 = xor8_5(b[3], a[2], a[1], b[0], a[0]);
    
    return [r0, r1, r2, r3];
}