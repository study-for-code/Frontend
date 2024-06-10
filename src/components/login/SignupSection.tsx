import { useNavigate } from "react-router-dom";

const SignupSection = () => {
  const navigation = useNavigate();

  const goToSignup = () => navigation("/signup");
  return (
    <div className="signupSection">
      <span className="ment1">계정이 없으신가요?</span>
      <span className="ment2" onClick={goToSignup}>
        회원가입
      </span>
    </div>
  );
};

export default SignupSection;
