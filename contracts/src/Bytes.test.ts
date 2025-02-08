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
});
