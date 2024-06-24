import axios from "axios";
import { useEffect, useState } from "react";

// image
import Expansion from "@/assets/home/expansion.png";

// atom
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import {
  pageState,
  selectedStudyState,
  userSectionState,
  subscribeIdState,
} from "@/atom/stats";

// type
import { User } from "@/types/User";
import { ComponentMap, reviewSelectedUserType } from "@/types/aboutHome";
import useGetSolvedMembers, {
  useGetSolvedMembersType,
} from "@/hooks/code/useGetSolvedMember";

export interface UserSectionType {
  setUserData: SetterOrUpdater<reviewSelectedUserType>;
  setPage: SetterOrUpdater<keyof ComponentMap>;
}

const UserSection = ({ setUserData }: UserSectionType) => {
  const [showUserSection, setShowUserSection] =
    useRecoilState(userSectionState);
  const selectedStudy = useRecoilValue(selectedStudyState);
  const [page, setPage] = useRecoilState(pageState);
  const [members, setMembers] = useState<User[]>([]);
  const [solvedMembers, setSolvedMembers] = useState<number[]>([]);

  const [subscribeId] = useRecoilState(subscribeIdState);

  const handleUserSection = () => {
    if (page === "codeIde") {
      setPage("algorithmDescription");
      setShowUserSection(!showUserSection);
    } else if (selectedStudy) {
      setShowUserSection(!showUserSection);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/studies/${selectedStudy?.studyId}`
      );
      // console.log(response.data.results[0]);
      setMembers(response.data.results[0].members);
    } catch (e) {
      console.error(e);
    }
  };

  const getSolvedMembers = async () => {
    const object: useGetSolvedMembersType = {
      setSolvedMembers,
      subscribeId,
      selectedStudy,
    };

    const execute = useGetSolvedMembers(object);
    execute();
  };

  useEffect(() => {
    if (subscribeId > 0 && showUserSection) {
      getSolvedMembers();
    }
  }, [subscribeId, showUserSection]);

  useEffect(() => {
    if (selectedStudy && selectedStudy.studyId > 0) {
      getMembers();
    }
  }, [selectedStudy]);

  return (
    <div className="userSection">
      <img
        src={Expansion}
        className="expansionButton"
        onClick={handleUserSection}
      />
      {showUserSection &&
        selectedStudy &&
        (page === "algorithmList" || page === "defaultPage" ? (
          <div className="userContent">
            <div className="title">스터디 멤버</div>
            <div className="members">
              {members.map((member) => (
                <div>
                  {member.memberId === selectedStudy.ownerId && (
                    <div className="small-text">Host</div>
                  )}
                  - {member.nickname}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="userContent">
            <div className="title">코드 리뷰</div>
            <div className="mini-title">summitted</div>
            <div className="members">
              {members
                .filter((member) => solvedMembers.includes(member.memberId))
                .map((member, index) => (
                  <div
                    key={index}
                    className="solvedMember"
                    onClick={() => {
                      setPage("codeReview");
                      setUserData(member);
                    }}
                  >
                    - {member.nickname}
                  </div>
                ))}
            </div>
            <div className="mini-title">not summitted</div>
            <div className="members">
              {members
                .filter((member) => !solvedMembers.includes(member.memberId))
                .map((member, index) => (
                  <div key={index}>- {member.nickname}</div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserSection;
