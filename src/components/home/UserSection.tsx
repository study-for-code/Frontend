import Expansion from "@/assets/home/expansion.png";
import { pageState, selectedStudyState, userSectionState } from "@/atom/stats";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

const UserSection = () => {
  const [showUserSection, setShowUserSection] =
    useRecoilState(userSectionState);
  const selectedStudy = useRecoilValue(selectedStudyState);
  const page = useRecoilValue(pageState);
  const [members, setMembers] = useState<User[]>([]);

  console.log("selectedStudy : ", selectedStudy);

  const handleUserSection = () => {
    if (selectedStudy) {
      setShowUserSection(!showUserSection);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies/${selectedStudy?.studyId}`
      );
      console.log("get study : ", response.data.results[0].members);
      setMembers(response.data.results[0].members);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMembers();
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
              {members.map((member, index) => (
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
