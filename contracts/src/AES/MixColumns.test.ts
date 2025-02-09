import { Field } from "o1js";
import { mixColumn, gmixColumn, gmixColumnInv, gmul } from "./MixColumns";
import { FieldList } from "../utils/list";
import { Byte16 } from "../primitives/Bytes";

describe("GMixColumns", () => {
    // Examples taken from: https://www.samiam.org/mix-column.html
    it("generates correct key for single column input", async () => {
        const input = FieldList.from([Field(0xdb), Field(0x13), Field(0x53), Field(0x45)]);

        const num = gmixColumn(input);
        expect(num.toArrayUnconstrained().get()).toEqual([Field(0x8e), Field(0x4d), Field(0xa1), Field(0xbc)]);
        
        const input2 = FieldList.from([Field(0xf2), Field(0x0a), Field(0x22), Field(0x5c)]);
        const num2 = gmixColumn(input2);
        expect(num2.toArrayUnconstrained().get()).toEqual([Field(0x9f), Field(0xdc), Field(0x58), Field(0x9d)]);

        const input3 = FieldList.from([Field(0x01), Field(0x01), Field(0x01), Field(0x01)]);
        const num3 = gmixColumn(input3);
        expect(num3.toArrayUnconstrained().get()).toEqual([Field(0x01), Field(0x01), Field(0x01), Field(0x01)]);

        const input4 = FieldList.from([Field(0xc6), Field(0xc6), Field(0xc6), Field(0xc6)]);
        const num4 = gmixColumn(input4);
        expect(num4.toArrayUnconstrained().get()).toEqual([Field(0xc6), Field(0xc6), Field(0xc6), Field(0xc6)]);

        const input5 = FieldList.from([Field(0xd4), Field(0xd4), Field(0xd4), Field(0xd5)]);
        const num5 = gmixColumn(input5);
        expect(num5.toArrayUnconstrained().get()).toEqual([Field(0xd5), Field(0xd5), Field(0xd7), Field(0xd6)]);

        const input6 = FieldList.from([Field(0x2d), Field(0x26), Field(0x31), Field(0x4c)]);
        const num6 = gmixColumn(input6);
        expect(num6.toArrayUnconstrained().get()).toEqual([Field(0x4d), Field(0x7e), Field(0xbd), Field(0xf8)]);
    });

    it("generates correct inverse from single column input", async () => {
        const input = FieldList.from([Field(0x8e), Field(0x4d), Field(0xa1), Field(0xbc)]);

        const num = gmixColumnInv(input);
        expect(num.toArrayUnconstrained().get()).toEqual([Field(0xdb), Field(0x13), Field(0x53), Field(0x45)]);
        
        const input2 = FieldList.from([Field(0x9f), Field(0xdc), Field(0x58), Field(0x9d)]);
        const num2 = gmixColumnInv(input2);
        expect(num2.toArrayUnconstrained().get()).toEqual([Field(0xf2), Field(0x0a), Field(0x22), Field(0x5c)]);

        const input3 = FieldList.from([Field(0x01), Field(0x01), Field(0x01), Field(0x01)]);
        const num3 = gmixColumnInv(input3);
        expect(num3.toArrayUnconstrained().get()).toEqual([Field(0x01), Field(0x01), Field(0x01), Field(0x01)]);

        const input4 = FieldList.from([Field(0xc6), Field(0xc6), Field(0xc6), Field(0xc6)]);
        const num4 = gmixColumnInv(input4);
        expect(num4.toArrayUnconstrained().get()).toEqual([Field(0xc6), Field(0xc6), Field(0xc6), Field(0xc6)]);

        const input5 = FieldList.from([Field(0xd5), Field(0xd5), Field(0xd7), Field(0xd6)]);
        const num5 = gmixColumnInv(input5);
        expect(num5.toArrayUnconstrained().get()).toEqual([Field(0xd4), Field(0xd4), Field(0xd4), Field(0xd5)]);

        const input6 = FieldList.from([Field(0x4d), Field(0x7e), Field(0xbd), Field(0xf8)]);
        const num6 = gmixColumnInv(input6);
        expect(num6.toArrayUnconstrained().get()).toEqual([Field(0x2d), Field(0x26), Field(0x31), Field(0x4c)]);
    });


    it("Generates correct outputs for gmul: galios field(2^8) multiplication", async () => {
      let num = gmul(Field(0x0), Field(0x0));
      expect(num).toEqual(Field(0x0));
      num = gmul(Field(0x7), Field(0x2));
      expect(num).toEqual(Field(0xe));
      num = gmul(Field(0x7), Field(0x3));
      expect(num).toEqual(Field(0x9));
      num = gmul(Field(0x7), Field(0x4));
      expect(num).toEqual(Field(0x1c));
      num = gmul(Field(0x7), Field(0x5));
      expect(num).toEqual(Field(0x1b));
      num = gmul(Field(0x7), Field(0x6));
      expect(num).toEqual(Field(0x12));
      num = gmul(Field(0x7), Field(0x7));
      expect(num).toEqual(Field(0x15));
      num = gmul(Field(0x7), Field(0x8));
      expect(num).toEqual(Field(0x38));
      num = gmul(Field(0x7), Field(0x9));
      expect(num).toEqual(Field(0x3f));
      num = gmul(Field(0x8), Field(0x0));
      expect(num).toEqual(Field(0x0));
      num = gmul(Field(0x8), Field(0x1));
      expect(num).toEqual(Field(0x8));
      num = gmul(Field(0x8), Field(0x2));
      expect(num).toEqual(Field(0x10));
      num = gmul(Field(0x8), Field(0x3));
      expect(num).toEqual(Field(0x18));
      num = gmul(Field(0x8), Field(0x4));
      expect(num).toEqual(Field(0x20));
      num = gmul(Field(0x8), Field(0x5));
      expect(num).toEqual(Field(0x28));
      num = gmul(Field(0x8), Field(0x6));
      expect(num).toEqual(Field(0x30));
      num = gmul(Field(0x8), Field(0x7));
      expect(num).toEqual(Field(0x38));
      num = gmul(Field(0x8), Field(0x8));
      expect(num).toEqual(Field(0x40));
      num = gmul(Field(0x8), Field(0x9));
      expect(num).toEqual(Field(0x48));
      num = gmul(Field(0x9), Field(0x0));
      expect(num).toEqual(Field(0x0));
      num = gmul(Field(0x9), Field(0x1));
      expect(num).toEqual(Field(0x9));
      num = gmul(Field(0x9), Field(0x2));
      expect(num).toEqual(Field(0x12));
      num = gmul(Field(0x9), Field(0x3));
      expect(num).toEqual(Field(0x1b));
      num = gmul(Field(0x9), Field(0x4));
      expect(num).toEqual(Field(0x24));
      num = gmul(Field(0x9), Field(0x5));
      expect(num).toEqual(Field(0x2d));
      num = gmul(Field(0x9), Field(0x6));
      expect(num).toEqual(Field(0x36));
      num = gmul(Field(0x9), Field(0x7));
      expect(num).toEqual(Field(0x3f));
      num = gmul(Field(0x9), Field(0x8));
      expect(num).toEqual(Field(0x48));
      num = gmul(Field(0x9), Field(0x9));
      expect(num).toEqual(Field(0x41));
          
    })


  it("Generates correct key for whole matrix inputs", async () => {
    const input = Byte16.fromBytes([
      0xdb, 0xf2, 0x01, 0xc6, 
      0x13, 0x0a, 0x01, 0xc6,
      0x53, 0x22, 0x01, 0xc6,
      0x45, 0x5c, 0x01, 0xc6,
    ]);
    const num = mixColumn(input);
    expect(num.toField().toBigInt().toString(16)).toEqual('8e9f01c64ddc01c6a15801c6bc9d01c6');
    // input transposed
    // 0xdb, 0x13, 0x53, 0x45,
    // 0xf2, 0x0a, 0x22, 0x5c,
    // 0x01, 0x01, 0x01, 0x01,
    // 0xc6, 0xc6, 0xc6, 0xc6,

    // output transposed
    // 8e 4d a1 bc
    // 9f dc 58 9d
    // 01 01 01 01
    // c6 c6 c6 c6
  })
});