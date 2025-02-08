type KeyGenProps = {
  aesKey: string;
  setAesKey: (key: string) => void;
};

export const generateRandomKey = () => {
  const key = new Uint8Array(16);
  crypto.getRandomValues(key);
  return Array.from(key)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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
        maxLength={32}
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
