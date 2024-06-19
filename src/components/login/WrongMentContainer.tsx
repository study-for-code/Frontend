import { UserDataContext } from "@/pages/Login/Login";
import { LoginType } from "@/types/aboutLogin";
import { useContext } from "react";

interface WrongMentContainerType {
  mentState: boolean;
}

const WrongMentContainer = ({}: WrongMentContainerType) => {
  const userDataContext = useContext<LoginType | null>(UserDataContext);
  console.log("userDataContext: ", userDataContext);

  const showComponents = () => {
    switch (userDataContext?.code) {
      case 401:
        /* 비밀번호 불일치 */
        return (
          <span className="wrongMent">
            비밀번호 정보가 일치하지 않습니다 ❌
          </span>
        );

      case 404:
        /* "존재하지 않는 회원 */
        return (
          <span className="wrongMent">회원 정보가 일치하지 않습니다 ❌</span>
        );

      default:
        return <span></span>;
    }
  };
  return (
    <div
      className="wronMentContainer"
      style={{
        width: "28vw",
        marginBottom: "1rem",
        marginTop: `${userDataContext?.code !== 0 ? "0" : "1.5rem"}`,
      }}
    >
      {userDataContext?.code !== 0 && showComponents()}
    </div>
  );
};

export default WrongMentContainer;
