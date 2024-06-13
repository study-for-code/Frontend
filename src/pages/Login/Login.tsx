import { createContext, useEffect, useState } from "react";

// styles
import { LoginContainer } from "@/styles/login/loginStyles";

// components
import TitleContainer from "@/components/login/TitleContainer";
import InputSection from "@/components/login/InputSection";
import WrongMentContainer from "@/components/login/WrongMentContainer";
import DivideSection from "@/components/login/DivideSection";
import KakaoBtnSection from "@/components/login/KakaoBtnSection";
import SignupSection from "@/components/login/SignupSection";

// types
import { LoginType } from "@/types/aboutLogin";

export const UserDataContext = createContext<LoginType | null>(null);

const Login = () => {
  const [pwdState, setPwdState] = useState(false);
  // 유저 데이터
  const [userData, setUserData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const inputData = (sort: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  };

  // useEffect(() => {
  //   console.log("userData: ", userData);
  // }, [userData]);

  return (
    <LoginContainer>
      <UserDataContext.Provider value={userData}>
        <TitleContainer />
        <InputSection
          pwdState={pwdState}
          setPwdState={setPwdState}
          inputData={inputData}
        />

        <WrongMentContainer />
        <button className="loginBtn">로그인</button>
      </UserDataContext.Provider>
      <DivideSection />
      <KakaoBtnSection />
      <SignupSection />
    </LoginContainer>
  );
};

export default Login;
