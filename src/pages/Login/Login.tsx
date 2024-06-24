import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// styles
import {
  LoginContainer,
  LoginLoaderContainer,
} from "@/styles/login/loginStyles";

// components
import TitleContainer from "@/components/login/TitleContainer";
import InputSection from "@/components/login/InputSection";
import WrongMentContainer from "@/components/login/WrongMentContainer";
import DivideSection from "@/components/login/DivideSection";
import KakaoBtnSection from "@/components/login/KakaoBtnSection";
import SignupSection from "@/components/login/SignupSection";

// types
import { LoginType } from "@/types/aboutLogin";

// libraries
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

export const UserDataContext = createContext<LoginType | null>(null);

const Login = () => {
  const [, setCookies] = useCookies([
    "accessToken",
    "email",
    "nickname",
    "memberId",
  ]);
  const navigation = useNavigate();
  // 비밀번호 보이게
  const [pwdState, setPwdState] = useState(false);
  // ment
  const [mentState, setMentState] = useState(false);
  // 유저 데이터
  const [userData, setUserData] = useState<LoginType>({
    email: "",
    password: "",
    code: 0,
  });
  const { email, password, code } = userData;

  const inputData = (sort: string, value: string) => {
    const code = 0;
    if (value === "") {
      setMentState(false);
    }
    setUserData((prev) => ({
      ...prev,
      [sort]: value,
      code,
    }));
  };

  const login = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/login`,
        {
          email,
          password,
        }
      );
      // console.log(response);
      const { code } = response.data;
      setUserData((prev) => ({
        ...prev,
        code,
      }));
      changeMentState();

      const { memberId, nickname, token } = response.data.results[0];
      setCookies("accessToken", token, { path: "/" });
      setCookies("email", email, { path: "/" });
      setCookies("memberId", memberId, { path: "/" });
      setCookies("nickname", nickname, { path: "/" });

      if (code === 200) {
        setTimeout(() => {
          navigation("/");
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeMentState = () => {
    setMentState(!mentState);
  };

  useEffect(() => {
    // console.log("mentState: ", mentState);
  }, [mentState]);

  return (
    <>
      {code === 200 ? (
        <LoginLoaderContainer>
          <span className="loader"></span>
        </LoginLoaderContainer>
      ) : (
        <LoginContainer $mentstate={mentState}>
          <UserDataContext.Provider value={userData}>
            <TitleContainer />
            <InputSection
              pwdState={pwdState}
              setPwdState={setPwdState}
              inputData={inputData}
            />
            <WrongMentContainer mentState={mentState} />
            <button className="loginBtn" onClick={login}>
              로그인
            </button>
          </UserDataContext.Provider>
          <DivideSection />
          <KakaoBtnSection />
          <SignupSection />
        </LoginContainer>
      )}
    </>
  );
};

export default Login;
