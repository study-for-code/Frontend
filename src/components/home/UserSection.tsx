import Expansion from "@/assets/home/expansion.png";
import { pageState, selectedStudyState, userSectionState } from "@/atom/stats";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { ComponentMap, reviewSelectedUserType } from "@/types/aboutHome";

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
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies/${selectedStudy?.studyId}`
      );
      console.log(response.data.results[0]);
      setMembers(response.data.results[0].members);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedStudy) {
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
        (page === "algorithmList" ||
        page === "defaultPage" ||
        page === "algorithmDescription" ? (
          <div className="userContent">
            <div className="title">스터디 멤버</div>
            <div className="members">
              {members.map((member) => (
                <div
                  onClick={() => {
                    setPage("codeReview");
                    setUserData(member);
                  }}
                >
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
              <div>member1</div>
              <div>member2</div>
              <div>member3</div>
            </div>
            <div className="mini-title">not summitted</div>
            <div className="members">
              <div>member1</div>
              <div>member2</div>
              <div>member3</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserSection;
