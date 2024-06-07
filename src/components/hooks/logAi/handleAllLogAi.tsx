import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgLogsAiApi from "./useAmgLogsAiApi";

const useHandleAllLogAiAPI = () => {
  const { getLogsAiStatus } = useAmgLogsAiApi();
  const { userDetails } = useUserDetails();

  const userEmail = userDetails?.startList.users[0].description as string;
  function handleAllLogAiApi(props: {
    question: string;
    answer: string;
    reaction: string;
    step: string;
    fileName: string;
    fileSize: number;
    tokensIn: string;
    tokensOut: string;
    wordsIn: string;
    wordsOut: string;
  }) {
    

    try {
      getLogsAiStatus({
        userEmail: userEmail,
        question: props.question,
        answer: props.answer,
        result: props.reaction,
        step: props.step,
        fileName: props.fileName,
        fileSize: props.fileSize,
        tokensIn: props.tokensIn,
        tokensOut: props.tokensOut,
        wordsIn: props.wordsIn,
        wordsOut: props.wordsOut,
      });
    } catch (err) {
      console.error(err);
    }
  }
  return { handleAllLogAiApi };
};
export default useHandleAllLogAiAPI;
