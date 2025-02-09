import React from "react";

type KeyGenProps = {
  aesKey: string;
  setAesKey: (key: string) => void;
};

export const generateRandomKey = () => {
  // 16 random characters
  const characters = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
  );

  return characters.map((char) => String.fromCharCode(char)).join("");
};

const KeyGen: React.FC<KeyGenProps> = ({ aesKey, setAesKey }) => {
  const handleKeyGen = () => {
    setAesKey(generateRandomKey());
  };

  return (
    <div className="flex items-center gap-4">
      <label className="text-lg font-semibold">AES Key</label>
      <input
        type="text"
        value={aesKey}
        maxLength={16}
        onChange={(event) => setAesKey(event.target.value)}
        className="border p-2 rounded w-80"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={handleKeyGen}
      >
        Generate New Key
      </button>
    </div>
  );
};

export default KeyGen;
