import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const SignupContainer = styled.div`
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
`;
