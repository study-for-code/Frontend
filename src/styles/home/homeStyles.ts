import styled, { css } from "styled-components";
import { theme } from "@/styles/common/ColorStyles";

import { backSideBar, moveSideBar, showDrawer, hideDrawer } from "../keyframes";

export const Container = styled.div<{ showhamburgerBar: boolean }>`
  height: 96vh;
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
    height: 100%;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    background-color: ${theme.lightBlack};
    z-index: 1;
  }

  .element1 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    object-fit: cover;
    object-position: center;
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
    position: relative;
  }

  .plus {
    height: 20;
    color: ${theme.mainColor};
    font-size: 2rem;
  }

  .adminBtn {
    cursor: pointer;
    width: 25px;
    position: absolute;
    bottom: 0;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ffffff;
    border-radius: 50%;
  }

  .hamburgerBarContainer {
    position: relative;
    transition: 0.75s width;
    width: ${(props) => (props.showhamburgerBar ? "240px" : "40px")};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.gray};
    /* animation: ${(props) =>
      props.showhamburgerBar
        ? css`0.5s ${moveSideBar}
      ease-in-out`
        : css`0.5s ${backSideBar}
      ease-in-out`}; */
    animation-fill-mode: forwards;
  }

  .drawerSection {
    position: relative;
    z-index: 50;
    width: ${(props) => (props.showhamburgerBar ? "240px" : "40px")};
    height: ${(props) => (props.showhamburgerBar ? "120px" : "40px")};
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
      props.showhamburgerBar ? "flex-start" : "center"};
    justify-content: center;
    transition: 0.75s width;
    font-family: "GmarketSansMedium";
    padding-top: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
    background-color: ${theme.black};
    padding-left: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
  }

  .hamburgerbutton {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .hamburgerImage {
    margin-right: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
    margin-left: ${(props) => (props.showhamburgerBar ? null : "0.5rem")};
  }

  .studyName {
    display: flex;
    align-items: center;
  }

  .updateStudyName {
    margin-left: 0.5rem;
    width: 15px;
    cursor: pointer;
  }

  .StudyContent {
    padding: 0.5rem;
    font-size: 0.8rem;
    color: ${theme.fontWhiteColor};

    animation: ${(props) =>
      props.showhamburgerBar
        ? css`0.5s ${showDrawer}
      ease-in-out`
        : css`0.2s ${hideDrawer}
      ease-in-out`};
  }

  .drawerButton {
    transition: 0.75s width;
    width: ${(props) => (props.showhamburgerBar ? "240px" : "40px")};
    height: ${(props) => (props.showhamburgerBar ? "40px" : "40px")};
    display: flex;
    align-items: ${(props) =>
      props.showhamburgerBar ? "flex-start" : "flex-end"};
    justify-content: ${(props) =>
      props.showhamburgerBar ? "flex-end" : "center"};
    padding-right: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
    padding-top: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
    background-color: ${theme.black};
  }

  .drawerContent {
    transition: 0.75s width;
    width: ${(props) => (props.showhamburgerBar ? "240px" : "40px")};
    height: 90%;
    opacity: ${(props) => (props.showhamburgerBar ? 1 : 0)};
    background-color: ${theme.gray};
    color: ${(props) =>
      props.showhamburgerBar ? theme.CategoryFontColor : theme.gray};
    position: relative;
    padding-left: 1rem;
    animation: ${(props) =>
      props.showhamburgerBar
        ? css`0.5s ${showDrawer}
      ease-in-out`
        : css`0s ${hideDrawer}
      ease-in-out`};
  }

  .categorySpace {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    font-family: "GmarketSansMedium";
    position: relative;
    transition: 0.75s width;
    width: ${(props) => (props.showhamburgerBar ? null : "40px")};
  }

  .algorithmList {
    width: 200px;
    font-size: 1.3rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* &:hover {
      transition: 0.3s transform;
      background-color: ${theme.selectedGray};
      transform: scale(1.05);
    } */
  }

  .plusBtn {
    border-radius: 30%;
    &:hover {
      transition: 0.3s transform;
      background-color: ${theme.selectedGray};
      transform: scale(1.05);
    }
  }

  .categoryRow {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .categoryRow .hr-line {
    flex: 1;
    background-color: ${theme.CategoryFontColor};
    border: none;
    height: 1px;
    margin: 9px 0px;
  }

  .algorithmProblems {
    padding: 0.2rem;
    border-radius: 0.5rem;
    &:hover {
      &:hover {
        transition: 0.3s transform;
        background-color: ${theme.selectedGray};
        transform: scale(1.05);
      }
    }
  }

  .contentSection {
    transition: 0.5s width ease-in-out;
    flex: 1;
    padding-left: ${(props) => (props.showhamburgerBar ? "0.5rem" : null)};
    background-color: ${theme.lightGray};
    animation-fill-mode: forwards;
  }

  .userSection {
    right: 0;
    height: 96vh;
    background-color: ${theme.gray};
  }

  .expansionButton {
    padding: 1rem 1rem 0 1rem;
  }
`;

export const OptionsContainer = styled.div`
  position: fixed;
  width: 100px;
  z-index: 1000;

  .optionButton {
    font-family: "GmarketSansMedium";
    color: white;
    background-color: ${theme.lightGray};
    height: 30px;
    width: 100%;

    &:hover {
      background-color: white;
      color: ${theme.lightGray};
    }
  }
`;
