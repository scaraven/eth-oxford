import { Field } from 'o1js';
import { Byte16 } from './Bytes';

describe("Bytes", () => {

    it("Converts byte array to Byte16 instance and back", () => {
        // Example byte array
        const byteArray = [0x01, 0xAB, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xEF];

        // Create Byte16 instance from byte array
        const byte16Instance = Byte16.fromBytes(byteArray);

        // Convert back to byte array
        const convertedBack = byte16Instance.toBytes();

        expect(convertedBack).toEqual(byteArray);
    });

    it("Throws error when byte array is not 16 bytes", () => {
        const byteArray = [0x01, 0xAB, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC];

        expect(() => Byte16.fromBytes(byteArray)).toThrow("Expected 16 bytes, but got 15.");
    });

    it("Throws error when byte array is too large", () => {
        const byteArray = [0x01, 0xAB, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xFF, 0xFF];

        expect(() => Byte16.fromBytes(byteArray)).toThrow("Expected 16 bytes, but got 17.");
    });

    it("Throws error when byte value is out of range", () => {
        const byteArray = [0x01, 0xAB, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0x100];

        expect(() => Byte16.fromBytes(byteArray)).toThrow("Byte value 256 is out of range. Must be between 0 and 255.");
    });

    it("correctly calculates Byte16 internal value", () => {
        const byteArray = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ,0x00, 0x00, 0xde, 0xad];

        const byte16Instance = Byte16.fromBytes(byteArray);
        expect(byte16Instance.toField()).toEqual(Field(0xdead));
        expect(byte16Instance.toField()).toEqual(Field(57005));
    });

    it("arranges bytes into 4 columns", () => {
        const byteArray = [0x01, 0xAB, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xFF];

        const columns = Byte16.fromBytes(byteArray).toColumns();
        expect(columns[0]).toEqual([Field(0x01), Field(0x78), Field(0xF0), Field(0x78)]);
        expect(columns[1]).toEqual([Field(0xAB), Field(0x9A), Field(0x12), Field(0x9A)]);
        expect(columns[2]).toEqual([Field(0x34), Field(0xBC), Field(0x34), Field(0xBC)]);
        expect(columns[3]).toEqual([Field(0x56), Field(0xDE), Field(0x56), Field(0xFF)]);
    });
});
