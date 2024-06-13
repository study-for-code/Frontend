// img
import Logo from "@/assets/login/study_for_code.png";

import { UserDataContext } from "../../pages/Login/Login";
import { useContext } from "react";

const TitleContainer = () => {
  const userData = useContext(UserDataContext);
  console.log("TitleContainer: ", userData);
  return (
    <div className="logoContainer">
      <img src={Logo} className="logo" />
      <span className="projectTitle">StudyForCode</span>
    </div>
  );
};

export default TitleContainer;
