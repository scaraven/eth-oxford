import { Field } from "o1js";
import { gmixColumn } from "./MixColumns";
import { FieldList } from "../utils/list";

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
});