import MessageProcessor from "../../common/components/MessageProccessor";

const AESDemoPage = () => {
  return (
    <>
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
    </>
  );
};

export default AESDemoPage;
