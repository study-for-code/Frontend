import styled, { css } from "styled-components";
import { theme } from "../common/ColorStyles";
import {
  backContent,
  backSideBar,
  moveContent,
  moveSideBar,
} from "../keyframes";

export const Container = styled.div<{ showHamburgerBar: boolean }>`
  height: 100%;
  background-color: ${theme.lightGray};

  .header {
    background-color: ${theme.black};
    color: white;
    font-family: "GmarketSansMedium";
    padding: 0.5rem 0 0.5rem 0.5rem;
  }

  main {
    display: flex;
    flex-direction: row;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    height: 96vh;
    background-color: ${theme.lightBlack};
  }

  .element1 {
    width: 50px;
    border-radius: 50%;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .plusContainer {
    width: 50px;
    height: 50px;
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: ${theme.lightGray};
    border-radius: 50%;
  }

  .plus {
    height: 20;
    color: ${theme.mainColor};
    font-size: 2rem;
  }

  .hamburgerBarContainer {
    width: 40px;
    height: 96vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.gray};
    animation: ${(props) =>
      props.showHamburgerBar
        ? css`0.5s ${moveSideBar}
      ease-in-out`
        : css`0.5s ${backSideBar}
      ease-in-out`};
    animation-fill-mode: forwards;
  }

  .drawerSection {
    width: ${(props) => (props.showHamburgerBar ? "440px" : "40px")};
    height: ${(props) => (props.showHamburgerBar ? "120px" : "40px")};
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
      props.showHamburgerBar ? "flex-start" : "center"};
    justify-content: center;
    transition: 0.75s width;
    font-family: "GmarketSansMedium";
    padding-top: ${(props) => (props.showHamburgerBar ? "1rem" : null)};
    background-color: ${theme.black};
  }
  .hamburgerbutton {
    display: flex;
    justify-content: space-between;
    width: 52%;
  }

  .studyName {
    display: flex;
    align-items: center;
  }
  .StudyContent {
    padding: 0.5rem;
    font-size: 0.8rem;
    color: ${theme.fontWhiteColor};
  }
  .drawerButton {
    transition: 0.75s width;
    width: ${(props) => (props.showHamburgerBar ? "440px" : "40px")};
    height: ${(props) => (props.showHamburgerBar ? "80px" : "40px")};
    display: flex;
    align-items: ${(props) =>
      props.showHamburgerBar ? "flex-start" : "center"};
    justify-content: center;
    padding-top: ${(props) => (props.showHamburgerBar ? "1rem" : null)};
    background-color: ${theme.black};
  }

  .drawerContent {
    width: ${(props) => (props.showHamburgerBar ? "440px" : "40px")};
    height: 100%;
    visibility: ${(props) => (props.showHamburgerBar ? "none" : "hidden")};
    transition: 0.75s width;
    background-color: ${theme.gray};
  }

  .categorySpace {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    font-family: "GmarketSansMedium";
    color: ${theme.CategoryFontColor};
  }
  .categoryRow {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }
  .contentSection {
    z-index: 0;
    width: 100%;
    background-color: ${theme.lightGray};
    animation: ${(props) =>
      props.showHamburgerBar
        ? css`0.5s ${moveContent}
      ease-in-out`
        : css`0.5s ${backContent}
      ease-in-out`};
    animation-fill-mode: forwards;
  }

  .contentHeader {
    padding: 0.5rem;
    border-bottom: 1px solid ${theme.lightBlack};
  }

  .problemTitle {
    font-family: "GmarketSansBold";
    color: ${theme.fontWhiteColor};
    padding: 0.5rem 0 0.5rem 1rem;
    font-size: 1.3rem;
  }
  .userSection {
    z-index: 1;
    background-color: ${theme.gray};
  }
  .expansionButton {
    padding: 1rem 1rem 0 1rem;
  }
`;
