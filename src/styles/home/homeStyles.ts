import styled, { css } from "styled-components";
import { theme } from "@/styles/common/ColorStyles";

import { backSideBar, moveSideBar, showDrawer, hideDrawer } from "../keyframes";

export const Container = styled.div<{
  showhamburgerBar: boolean;
  showUserSection: boolean;
}>`
  height: 96vh;
  min-width: 73rem;
  background-color: ${theme.lightGray};
  display: flex;
  flex-direction: column;

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
    width: 6.25rem;
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
    animation-fill-mode: forwards;
  }

  .drawerSection {
    position: relative;
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
    padding-left: ${(props) => (props.showhamburgerBar ? "0" : null)};
  }

  .hamburgerbutton {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .hamburgerImage {
    width: 20px;
    height: 20px;
    margin-right: ${(props) => (props.showhamburgerBar ? "1rem" : null)};
    margin-left: ${(props) => (props.showhamburgerBar ? null : "0.5rem")};
  }

  .studyName {
    padding: 0.3rem;
    display: flex;
    align-items: center;
  }

  .updateStudyName {
    margin-left: 0.5rem;
    width: 15px;
    cursor: pointer;
  }

  .StudyContent {
    padding: 0.3rem;
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
    height: ${(props) => (props.showhamburgerBar ? "60px" : "40px")};
    display: flex;
    align-items: ${(props) => (props.showhamburgerBar ? "center" : "center")};
    justify-content: ${(props) =>
      props.showhamburgerBar ? "space-between" : "center"};
    padding-right: ${(props) => (props.showhamburgerBar ? "0" : null)};
    padding-top: ${(props) => (props.showhamburgerBar ? "0" : null)};
    background-color: ${theme.black};
    font-family: "GmarketSansMedium";
    color: white;
  }

  .drawerButtonContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${({ showhamburgerBar }) =>
      showhamburgerBar ? "space-between" : "center"};
    align-items: center;
  }
  .profileContainer {
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.5rem;
    animation: ${({ showhamburgerBar }) =>
      showhamburgerBar ? css`0.3s ${showDrawer}` : css`0.3s ${hideDrawer}`};
  }
  .logOut {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
  .drawerContent {
    transition: 0.75s width;
    width: ${(props) => (props.showhamburgerBar ? "240px" : "40px")};
    flex: 1;
    opacity: ${(props) => (props.showhamburgerBar ? 1 : 0)};
    background-color: ${theme.gray};
    color: ${(props) =>
      props.showhamburgerBar ? theme.CategoryFontColor : theme.gray};
    position: relative;
    /* padding-left: 1rem; */
    animation: ${(props) =>
      props.showhamburgerBar
        ? css`0.5s ${showDrawer}
      ease-in-out`
        : css`0s ${hideDrawer}
      ease-in-out`};
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .listColumn::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }

  .categoryTitle {
    width: 100%;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .categoryTitle.selected,
  .categoryTitle:hover {
    background-color: ${theme.selectedGray};
    border-radius: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  }
  .categoryRow .hr-line {
    flex: 1;
    background-color: ${theme.CategoryFontColor};
    border: none;
    height: 1px;
    margin: 9px 0px;
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
  .categorySpace ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }

  .category {
    overflow-y: auto;
    max-height: 500px;
  }
  .category ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }
  .algorithmProblems {
    height: auto;
    padding: 0.2rem;
    border-radius: 0.5rem;
  }

  .algorithmProblems:hover {
    background-color: ${theme.selectedGray};
    transform: scale(1.05);
  }

  .contentSection {
    transition: 0.5s width ease-in-out;
    flex: 1;
    padding-left: ${(props) => (props.showhamburgerBar ? "0.5rem" : null)};
    background-color: ${theme.lightGray};
    animation-fill-mode: forwards;
  }

  .userSection {
    height: 96vh;
    background-color: ${theme.gray};
    transition: 0.75s width;
    width: ${(props) => (props.showUserSection ? "240px" : "40px")};
    font-family: "GmarketSansMedium";
    color: ${theme.white};
  }

  .expansionButton {
    padding: 0.5rem;
    transform: ${(props) =>
      props.showUserSection ? "rotate(180deg)" : "none"};
    transition: transform 0.75s ease;
  }

  .userContent {
    padding-left: 1rem;
  }

  .title {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .mini-title {
    color: ${theme.CategoryFontColor};
    margin-top: 1.5rem;
    font-size: 0.8rem;
  }

  .members > div {
    padding: 0.5rem 0 0.5rem;
  }

  .small-text {
    font-size: 0.7rem;
    padding-left: 0.5rem;
    color: ${theme.CategoryFontColor};
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
