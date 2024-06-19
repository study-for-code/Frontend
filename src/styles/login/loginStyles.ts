import styled from "styled-components";
import { theme } from "../common/ColorStyles";
import { showWrongMent, showWrongMent2 } from "../keyframes";
import { LoginType } from "@/types/aboutLogin";
import { css } from "styled-components";

export const LoginContainer = styled.div<{ mentstate: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logoContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
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
  }
  .inputContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
  .inputEmail {
    width: 30vw;
    height: 6vh;
    padding-left: 0.5rem;
    border: 2px solid ${theme.inputBorderColor};
    font-family: "GmarketSansLight";
    outline: none;
    border-radius: 0.3rem 0.3rem 0 0;

    &:focus {
      border: 2px solid ${theme.mainColor};
      border-radius: 0.3rem 0.3rem 0 0;
    }
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
    border-radius: 0 0 0.3rem 0.3rem;

    &:hover {
      border-color: ${theme.mainColor};
    }
    &:focus {
      border-color: ${theme.mainColor};
    }
  }
  .input2 {
    width: 27vw;
    outline: none;
    border: none;
    font-family: "GmarketSansLight";
  }
  .inputPWD {
    width: 30vw;
    height: 6vh;
    padding-left: 0.5rem;
    border: 2px solid ${theme.inputBorderColor};
    font-family: "GmarketSansLight";
    outline: none;
    border-radius: 0 0 0.3rem 0.3rem;
    color: #efefef;

    &:focus {
      border: 2px solid ${theme.mainColor};
      border-radius: 0 0 0.3rem 0.3rem;
    }
  }
  /*  */
  .wrongMent {
    color: ${theme.wrongMent};
    font-family: "GmarketSansLight";
    margin-bottom: 1rem;
    animation: ${({ mentstate }) => {
      console.log("mentstate: ", mentstate);
      console.log("showWrongMent: ", showWrongMent);
      console.log("showWrongMent2: ", showWrongMent2);
      return mentstate
        ? css`
            ${showWrongMent} 0.5s linear
          `
        : css`
            ${showWrongMent2} 0.5s linear
          `;
    }};
  }
  /*  */

  .loginBtn {
    width: 30vw;
    height: 6vh;
    border: 2px solid ${theme.mainColor};
    border-radius: 0.3rem;
    background-color: ${theme.mainColor};
    outline: none;
    color: white;
    margin-bottom: 2rem;

    &:hover {
      background-color: white;
      color: ${theme.mainColor};
      border: 2px solid ${theme.mainColor};
    }
  }

  .dividerContainer {
    display: flex;
    flex-direction: row;
    gap: 20px; /* 또는 원하는 간격만큼 */
    margin-bottom: 2rem;
  }
  .divider {
    margin-top: 0.8rem;
    border: none;
    border-top: 1px dotted ${theme.selectedGray};
    color: #fff;
    background-color: #fff;
    height: 1px;
    width: 12vw;
  }

  .kakaoBtn {
    width: 30px;
    height: 30px;
  }
  .kakaoBtnContainer {
    width: 30vw;
    height: 6vh;
    background-color: ${theme.kakaoBackgroundColor};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.3rem;
    color: #3b1c1c;
    font-weight: 600;
    margin-bottom: 2rem;
    &:hover {
      transition: 0.3s transform ease-in-out;
      transform: scale(1.05);
    }
  }

  .signupSection {
    width: 15vw;
    display: flex;
    justify-content: space-around;
  }
  .ment1 {
    font-family: "GmarketSansLight";
  }
  .ment2 {
    color: #518dc5;
    font-family: "GmarketSansMedium";

    &:hover {
      transition: 0.3s transform;
      transform: scale(1.1);
    }
  }
`;

export const LoginLoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    color: ${theme.black};
    font-family: Consolas, Menlo, Monaco, monospace;
    font-weight: bold;
    font-size: 78px;
    opacity: 0.8;
  }
  .loader:before {
    content: "{";
    display: inline-block;
    animation: pulse 0.4s alternate infinite ease-in-out;
  }
  .loader:after {
    content: "}";
    display: inline-block;
    animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
  }

  @keyframes pulse {
    to {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
`;
