import styled from "styled-components";
import { theme } from "../common/ColorStyles";

interface SignupStyleProps {
  $message: string | null;
}

export const SignupContainer = styled.div<SignupStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logoContainer {
    width: 35vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .logo {
    width: 50px;
    height: 50px;
  }
  .projectTitle {
    font-size: 1.4rem;
    font-family: "GmarketSansBold";
    margin-left: 0.5rem;
    margin-right: 4rem;
  }

  .inputContainer {
    display: flex;
    flex-direction: column;
    width: 35vw;
  }
  .inputCon {
    display: flex;
    align-items: center;
    width: 30vw;
    height: 6vh;
    padding-left: 0.5rem;
    border: 2px solid ${theme.inputBorderColor};
    font-family: "GmarketSansLight";
    outline: none;
    border-radius: 0.3rem;

    &:focus {
      border: 2px solid ${theme.mainColor};
      border-radius: 0.3rem;
    }
    &:hover {
      border-color: ${theme.mainColor};
    }
  }
  .inputContainer span {
    font-family: "GmarketSansLight";
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .wrongMent {
    color: ${theme.wrongMent};
    font-family: "GmarketSansLight";
  }

  .input {
    width: 30vw;
    height: 6vh;
    padding-left: 0.5rem;
    border: 2px solid ${theme.inputBorderColor};
    font-family: "GmarketSansLight";
    outline: none;
    border-radius: 0.3rem;

    &:focus {
      border: 2px solid ${theme.mainColor};
      border-radius: 0.3rem;
    }
  }
  .input2 {
    width: 27vw;
    outline: none;
    border: none;
    font-family: "GmarketSansLight";
  }
  .correctMent {
    color: ${theme.correctMent};
    font-family: "GmarketSansLight";
  }
  .handlepwdIncon {
    width: 30px;
    height: 30px;
  }

  .signupBtn {
    width: 31vw;
    height: 6vh;
    border: 2px solid ${theme.mainColor};
    border-radius: 0.3rem;
    background-color: ${theme.mainColor};
    outline: none;
    color: white;
    font-family: "GmarketSansLight";
    margin-bottom: 2rem;

    &:hover {
      background-color: white;
      color: ${theme.mainColor};
      border: 2px solid ${theme.mainColor};
    }
  }
  // css loader
  .loader {
    width: 80px;
    height: 50px;
    position: relative;
  }

  .loader-text {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    color: #c8b6ff;
    animation: text_713 3.5s ease both infinite;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .load {
    background-color: #9a79ff;
    border-radius: 50px;
    display: block;
    height: 16px;
    width: 16px;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: loading_713 3.5s ease both infinite;
  }

  .load::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #d1c2ff;
    border-radius: inherit;
    animation: loading2_713 3.5s ease both infinite;
  }

  @keyframes text_713 {
    0% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }

    40% {
      letter-spacing: 2px;
      transform: translateX(26px);
    }

    80% {
      letter-spacing: 1px;
      transform: translateX(32px);
    }

    90% {
      letter-spacing: 2px;
      transform: translateX(0px);
    }

    100% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
  }

  @keyframes loading_713 {
    0% {
      width: 16px;
      transform: translateX(0px);
    }

    40% {
      width: 100%;
      transform: translateX(0px);
    }

    80% {
      width: 16px;
      transform: translateX(64px);
    }

    90% {
      width: 100%;
      transform: translateX(0px);
    }

    100% {
      width: 16px;
      transform: translateX(0px);
    }
  }

  @keyframes loading2_713 {
    0% {
      transform: translateX(0px);
      width: 16px;
    }

    40% {
      transform: translateX(0%);
      width: 80%;
    }

    80% {
      width: 100%;
      transform: translateX(0px);
    }

    90% {
      width: 80%;
      transform: translateX(15px);
    }

    100% {
      transform: translateX(0px);
      width: 16px;
    }
  }
`;
