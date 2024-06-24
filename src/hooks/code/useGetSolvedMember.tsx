import { Study } from "@/types/aboutStudy";
import axios from "axios";

interface SolvedMember {
  email: string;
  memberId: number;
  nickname: string;
  submitStatus: string;
}

export interface useGetSolvedMembersType {
  setSolvedMembers: React.Dispatch<React.SetStateAction<number[]>>;
  subscribeId: number;
  selectedStudy: Study | null;
}

const useGetSolvedMembers = ({
  setSolvedMembers,
  subscribeId,
  selectedStudy,
}: {
  setSolvedMembers: React.Dispatch<React.SetStateAction<number[]>>;
  subscribeId: number;
  selectedStudy: Study | null;
}): (() => Promise<void>) => {
  const getSolvedMembers = async () => {
    if (subscribeId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/subscribes/submit`,
          {
            params: {
              subscribeId: subscribeId,
              studyId: selectedStudy?.studyId,
            },
          }
        );
        // console.log("solved : ", response.data.results[0].submit);
        const result: SolvedMember[] = response.data.results[0].submit;
        const solvedMembers = result.filter((member) => {
          if (member.submitStatus === "FINISHED") {
            return member.memberId;
          }
        });
        const solvedMemberId = solvedMembers.map((member) => member.memberId);
        setSolvedMembers(solvedMemberId);
      } catch (e) {
        console.error(e);
      }
    }
  };
  return getSolvedMembers;
};

export default useGetSolvedMembers;
