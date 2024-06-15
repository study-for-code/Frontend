// img
import showPassword from "@/assets/signup/eye.png";
import hidePassword from "@/assets/signup/eye-closed.png";

// types
import { signupDataType } from "@/types/aboutSignup";

// libraries
import axios from "axios";

interface SignupInputSectionType {
  pwdState: boolean;
  setPwdState: React.Dispatch<React.SetStateAction<boolean>>;
  signupData: signupDataType;
  setSignupData: React.Dispatch<React.SetStateAction<signupDataType>>;
}

const SignupInputSection: React.FC<SignupInputSectionType> = ({
  pwdState,
  setPwdState,
  signupData,
  setSignupData,
}) => {

  const {email,nickname,password,confirmPassword} = signupData;
  const handlePassword = () => {
    setPwdState(!pwdState);
  };

  // 데이터 입력
  const handleInputData = (type: string, value: string) => {
    setSignupData(prev => ({
      ...prev,
      [type]: value,
    }))
  };

  // 회원가입
  const signup = async() => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_ADDRESS}/members`,{
        email,
    nickname,
    password,
    confirmPassword,
      });
      console.log(response);
    }catch(err){
      console.log(err);
    }
  }

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
        <input className="input" name="email" onChange={(e) => handleInputData(e.target.name, e.target.value)}/>
        <span className="wrongMent">중복된 이메일이 존재합니다 ❌</span>
      </div>
      <div className="inputContainer">
        <span>닉네임</span>
        <input className="input" name="nickname" onChange={(e) => handleInputData(e.target.name, e.target.value)}/>
      </div>
      <div className="inputContainer">
        <span>비밀번호</span>
        <div className="inputCon">
          <input className="input2" type={pwdState ? "text" : "password"} name="password" onChange={(e) => handleInputData(e.target.name, e.target.value)}/>
          <img
            src={pwdState ? hidePassword : showPassword}
            className="handlepwdIncon"
            onClick={handlePassword}
          />
        </div>
      </div>
      <div className="inputContainer">
        <span>비밀번호 확인</span>
        <input className="input" type={pwdState ? "text" : "password"} name="confirmPassword" onChange={(e) => handleInputData(e.target.name, e.target.value)}/>
        <span className="wrongMent">비밀번호가 일치하지 않습니다 ❌</span>
        <span className="correctMent">비밀번호가 일치합니다 ✅</span>
      </div>
      <button className="signupBtn" onClick={signup}>회원가입</button>
    </div>
  );
};

export default SignupInputSection;
