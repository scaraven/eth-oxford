import MessageProcessor from "../../common/components/MessageProccessor";
import { AesProofProvider } from "../../common/context/aesProofContext";

const AESDemoPage = () => {
  return (
    <AesProofProvider>
      <MessageProcessor processType="encrypt" />
      {/* <MessageProcessor
        processType="decrypt"
      /> */}
    </AesProofProvider>
  );
};

export default AESDemoPage;
