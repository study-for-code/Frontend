// img
import Logo from "@/assets/login/study_for_code.png";

const TitleContainer = () => {
  return (
    <div className="logoContainer">
      <img src={Logo} className="logo" />
      <span className="projectTitle">StudyForCode</span>
    </div>
  );
};

export default TitleContainer;
