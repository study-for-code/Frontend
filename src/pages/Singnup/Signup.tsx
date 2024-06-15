import { createContext, useEffect, useState } from "react";

// components
import TitleContainer from "@/components/login/TitleContainer";
import SignupInputSection from "@/components/signup/SignupInputSection";

// styles
import { SignupContainer } from "@/styles/signup/signupStyles";

// types
import { signupDataType } from "@/types/aboutSignup";

export const ContextData = createContext<signupDataType | null>(null);
const Signup = () => {
  const [pwdState, setPwdState] = useState(false);

  const [signupData, setSignupData] = useState<signupDataType>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    status: 0,
    message: "",
  });

  useEffect(() => {
    console.log("signupData: ", signupData);
  }, [signupData]);

  return (
    <SignupContainer message={signupData.message}>
      <ContextData.Provider value={signupData}>
        <TitleContainer />
        <SignupInputSection
          signupData={signupData}
          setSignupData={setSignupData}
          pwdState={pwdState}
          setPwdState={setPwdState}
        />
      </ContextData.Provider>
    </SignupContainer>
  );
};

export default Signup;
