// img
import Logo from "@/assets/login/study_for_code.png";

// pages
import { useContext } from "react";
// types
import { signupDataType } from "@/types/aboutSignup";
// apis
import { ContextData } from "@/pages/Singnup/Signup";

const TitleContainer = () => {
  const userData = useContext<signupDataType | null>(ContextData);
  console.log("TitleContainer: ", userData);
  return (
    <>
      {userData?.status === 200 ? null : (
        <div className="logoContainer">
          <img src={Logo} className="logo" />
          <span className="projectTitle">StudyForCode</span>
        </div>
      )}
    </>
  );
};

export default TitleContainer;
