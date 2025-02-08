import MessageProcessor from "../../common/components/MessageProccessor";
import { AesProofProvider } from "../../common/context/aesProofContext";

const AESDemoPage = () => {
  return (
    <AesProofProvider>
      <MessageProcessor
        title="AES Encryption"
        buttonText="Encrypt"
        processType="encrypt"
      />
      <MessageProcessor
        title="AES Decryption"
        buttonText="Decrypt"
        processType="decrypt"
        bgClass="bg-teal-100"
      />
    </AesProofProvider>
  );
};

export default AESDemoPage;
