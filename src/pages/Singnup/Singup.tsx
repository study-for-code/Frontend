import { useState } from "react";

// components
import TitleContainer from "@/components/login/TitleContainer";
import SignupInputSection from "@/components/signup/SignupInputSection";
import { SignupContainer } from "@/styles/signup/signupStyles";

const Singup = () => {
  const [pwdState, setPwdState] = useState(false);
  return (
    <SignupContainer>
      <TitleContainer />
      <SignupInputSection pwdState={pwdState} setPwdState={setPwdState} />
    </SignupContainer>
  );
};

export default Singup;
