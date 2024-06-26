import styled, { css } from "styled-components";
import { theme } from "@/styles/common/ColorStyles";

import { showDrawer, hideDrawer } from "../keyframes";

interface HomeStyleProps {
  $showhamburgerBar?: boolean;
  $showUserSection?: boolean;
}

export const Container = styled.div<HomeStyleProps>`
  height: 96vh;
  min-width: 73rem;
  background-color: ${theme.lightGray};
  display: flex;
  flex-direction: column;

  .header {
    background-color: ${theme.black};
    color: white;
    font-family: "GmarketSansBold";
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
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    object-fit: cover;
    object-position: center;
  }

  .imageInstead {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    background-color: ${theme.lightGray};
    color: ${theme.fontWhiteColor};
    font-family: "GmarketSansBold";
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
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
    width: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "240px" : "40px")};
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
    width: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "240px" : "40px")};
    height: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "120px" : "40px"};
    display: flex;
    flex-direction: column;
    align-items: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "flex-start" : "center"};
    justify-content: center;
    transition: 0.75s width;
    font-family: "GmarketSansMedium";
    padding-top: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "1rem" : null};
    background-color: ${theme.black};
    padding-left: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "0" : null};
  }

  .hamburgerbutton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .hamburgerImage {
    width: 20px;
    height: 20px;
    margin-right: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "1rem" : null};
    margin-left: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? null : "0.5rem"};
  }

  .studyName {
    padding: 0.3rem;
    display: flex;
    align-items: center;
  }

  .editAreaStudy {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.2rem;
  }

  .editInputStudy {
    width: 6rem;
    height: 1.5rem;
    font-family: "GmarketSansMedium";
    font-size: 1rem;
    background-color: none;
    border: none;
    color: ${theme.white};
    background-color: ${theme.black};
    border: none;
    border-bottom: 2px solid ${theme.lightGray};
  }

  .editInputStudy:focus {
    outline: none;
  }

  .editBtnStudy {
    cursor: pointer;
    font-family: "GmarketSansMedium";
    height: 1.4rem;
    border: none;
    color: ${theme.white};
    background-color: ${theme.lightGray};
    border-radius: 5px;
    /* padding: 0.5rem; */

    &:hover {
      background-color: ${theme.white};
      color: ${theme.lightGray};
    }
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

    animation: ${({ $showhamburgerBar }) =>
      $showhamburgerBar
        ? css`0.5s ${showDrawer}
      ease-in-out`
        : css`0.2s ${hideDrawer}
      ease-in-out`};
  }

  .drawerButton {
    transition: 0.75s width;
    width: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "240px" : "40px")};
    height: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "60px" : "40px")};
    display: flex;
    align-items: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "center" : "center"};
    justify-content: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "space-between" : "center"};
    padding-right: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "0" : null};
    padding-top: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "0" : null)};
    background-color: ${theme.black};
    font-family: "GmarketSansMedium";
    color: white;
  }

  .drawerButtonContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "space-between" : "center"};
    align-items: center;
  }
  .profileContainer {
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.5rem;
    animation: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? css`0.3s ${showDrawer}` : css`0.3s ${hideDrawer}`};
  }
  .logOut {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
  .drawerContent {
    transition: 0.75s width;
    width: ${({ $showhamburgerBar }) => ($showhamburgerBar ? "240px" : "40px")};
    flex: 1;
    opacity: ${({ $showhamburgerBar }) => ($showhamburgerBar ? 1 : 0)};
    background-color: ${theme.gray};
    color: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? theme.CategoryFontColor : theme.gray};
    position: relative;
    /* padding-left: 1rem; */
    animation: ${({ $showhamburgerBar }) =>
      $showhamburgerBar
        ? css`0.5s ${showDrawer}
      ease-in-out`
        : css`0s ${hideDrawer}
      ease-in-out`};

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.gray};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.lightBlack};
      border-radius: 10px;
      border: 4px solid ${theme.lightBlack};
      background-clip: padding-box;
    }
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

  .categorySpace {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    font-family: "GmarketSansMedium";
    position: relative;
    transition: 0.75s width;
    width: ${({ $showhamburgerBar }) => ($showhamburgerBar ? null : "40px")};
  }

  .categorySpace ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }

  .category {
    overflow-y: auto;
    /* max-height: 500px; */
  }

  .category ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }

  .categoryRow {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* padding: 0.2rem 0.4rem 0.2rem 0.4rem; */
  }

  .categoryRow > div {
    width: 100%;
  }

  .editAreaCG {
    height: 1.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  }

  .editInputCG {
    width: 7rem;
    height: 1.2rem;
    padding-bottom: 0.2rem;
    font-family: "GmarketSansMedium";
    font-size: 1rem;
    background-color: none;
    border: none;
    color: ${theme.white};
    background-color: ${theme.gray};
    border: none;
    border-bottom: 2px solid ${theme.lightBlack};
  }

  .editInputCG:focus {
    outline: none;
  }

  .editBtnCG {
    cursor: pointer;
    font-family: "GmarketSansMedium";
    height: 1.4rem;
    border: none;
    color: ${theme.white};
    background-color: ${theme.black};
    border-radius: 5px;
    /* padding: 0.5rem; */

    &:hover {
      background-color: ${theme.white};
      color: ${theme.lightGray};
    }
  }

  .categoryTitle {
    /* width: 100%; */
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  }

  .categoryTitle:hover {
    background-color: ${theme.selectedGray};
    border-radius: 0.5rem;
    /* transform: scale(1.05); */
  }

  .selected {
    background-color: ${theme.black};
    border-radius: 0.5rem;
  }

  .hr-line {
    flex: 1;
    background-color: ${theme.CategoryFontColor};
    border: none;
    height: 1px;
    margin: 9px 0px;
  }

  .listColumn::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }

  .algorithmProblems {
    height: auto;
    padding: 0.2rem;
    border-radius: 0.5rem;
  }

  .algorithmProblems:hover {
    background-color: ${theme.selectedGray};
    /* transform: scale(1.05); */
    border-radius: 0.5rem;
  }

  .algorithmProblems > li {
    word-wrap: break-word; /* 긴 단어가 자동으로 줄바꿈되도록 설정 */
    word-break: break-all; /* 단어가 잘려서라도 줄바꿈되도록 설정 */
    overflow-wrap: break-word;
  }

  .contentSection {
    transition: 0.5s width ease-in-out;
    flex: 1;
    padding-left: ${({ $showhamburgerBar }) =>
      $showhamburgerBar ? "0.5rem" : null};
    background-color: ${theme.lightGray};
    animation-fill-mode: forwards;
  }

  .userSection {
    height: 96vh;
    background-color: ${theme.gray};
    transition: 0.75s width;
    width: ${({ $showUserSection }) => ($showUserSection ? "15rem" : "2.5rem")};
    font-family: "GmarketSansMedium";
    color: ${theme.white};
  }

  .expansionButton {
    padding: 0.5rem;
    transform: ${({ $showUserSection }) =>
      $showUserSection ? "rotate(180deg)" : "none"};
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
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }

  .members > div {
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  .small-text {
    font-size: 0.7rem;
    padding-left: 0.5rem;
    color: ${theme.CategoryFontColor};
  }

  .solvedMember {
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: ${theme.black};
    }
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
