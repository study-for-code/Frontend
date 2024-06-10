// img
import showPassword from "@/assets/signup/eye.png";
import hidePassword from "@/assets/signup/eye-closed.png";

interface SignupInputSectionType {
  pwdState: boolean;
  setPwdState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupInputSection: React.FC<SignupInputSectionType> = ({
  pwdState,
  setPwdState,
}) => {
  const handlePassword = () => {
    setPwdState(!pwdState);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="inputContainer">
        <span>이메일</span>
        <input className="input" />
        <span className="wrongMent">중복된 이메일이 존재합니다 ❌</span>
      </div>
      <div className="inputContainer">
        <span>닉네임</span>
        <input className="input" />
      </div>
      <div className="inputContainer">
        <span>비밀번호</span>
        <div className="inputCon">
          <input className="input2" type={pwdState ? "text" : "password"} />
          <img
            src={pwdState ? hidePassword : showPassword}
            className="handlepwdIncon"
            onClick={handlePassword}
          />
        </div>
      </div>
      <div className="inputContainer">
        <span>비밀번호 확인</span>
        <input className="input" type={pwdState ? "text" : "password"} />
        <span className="wrongMent">비밀번호가 일치하지 않습니다 ❌</span>
        <span className="correctMent">비밀번호가 일치합니다 ✅</span>
      </div>
      <button className="signupBtn">회원가입</button>
    </div>
  );
};

export default SignupInputSection;
