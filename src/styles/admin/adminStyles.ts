import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const AdminContainer = styled.div<{ testcasemodal: boolean }>`
  height: auto;
  background-color: ${(props) =>
    props.testcasemodal === true ? "#6F7074" : `${theme.adminBg}`};

  .header {
    background-color: ${(props) =>
      props.testcasemodal === true ? `rgba(35, 35, 35, 0.3)` : theme.black};
    color: white;
    font-family: "GmarketSansMedium";
    padding: 0.5rem 0 0.5rem 0.5rem;
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    /* background-color: ${theme.adminContentBg}; */
  }

  .list {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .sub_list {
    color: white;
    font-family: "GmarketSansBold";
    margin-top: 4rem;
    margin-right: 1rem;
    gap: 0.5rem;
    .sub_title {
      font-size: 1.1rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    .sub_element {
      font-family: "GmarketSansMedium";
      padding: 0.5rem 4rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;

      &:hover {
        background-color: ${theme.selectedGray};
      }
    }
  }
  .contentSection {
    width: 100%;
    height: 100%;
    background-color: ${theme.adminContentBg};
  }

  .content {
    padding: 3rem 1rem 1rem 2rem;
    background-color: ${(props) =>
      props.testcasemodal === true ? "#6F7074" : `${theme.adminBg}`};
  }
  .title {
    font-family: "GmarketSansBold";
    color: white;
    font-size: 1.3rem;
  }
  .problemSection {
    width: 45%;
    height: 50%;
    margin-top: 3rem;
    margin-bottom: 1rem;
    background-color: ${(props) =>
      props.testcasemodal === true
        ? `rgba(35, 35, 35, 0.3)`
        : `${theme.black}`};

    padding: 1rem;
    border-radius: 0.5rem;
  }
  .topSection {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
  }
  .imgBg {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 7.5rem;
    left: 25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.testcasemodal === true ? `rgba(35, 35, 35, 0.3)` : theme.black};
    border-radius: 50%;
  }
  .img {
    width: 70px;
    height: 70px;
    opacity: ${(props) => (props.testcasemodal === true ? 0.7 : 1)};
  }
  .userName {
    font-family: "GmarketSansBold";
    color: white;
    font-size: 1.1rem;
  }
  .buttonContainer {
    width: 56%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .inputProblem {
    width: 9vw;
    font-size: 1.1rem;
    font-family: "GmarketSansBold";
    background-color: ${(props) =>
      props.testcasemodal === true ? `rgba(45,168,166,0.3)` : theme.mainColor};
    color: white;
    outline: none;
    border: none;
    padding-top: 0.5rem;
    border-radius: 0.3rem;

    &:hover {
      background-color: ${theme.adminContentBg};
      color: ${theme.mainColor};

      border: 1px solid ${theme.mainColor};
    }
  }
  .testCase {
    width: 9vw;
    font-size: 1.1rem;
    font-family: "GmarketSansBold";
    padding-top: 0.5rem;
    border-radius: 0.3rem;
    background-color: ${(props) =>
      props.testcasemodal === true
        ? `rgba(49,51,56,0.3)`
        : theme.adminContentBg};
    color: ${theme.mainColor};

    border: 1px solid ${theme.mainColor};

    &:hover {
      background-color: ${theme.mainColor};
      color: white;
      outline: none;
      border: none;
    }
  }
  .testCaseModal {
    position: absolute;
    overflow-y: scroll;
    padding: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 70%;
    border-radius: 0.5rem;
    background-color: ${theme.lightBlack};
    -ms-overflow-style: none; /* 익스플로러와 엣지의 경우 */
  }
  .testCaseModal::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지의 경우 */
  }
  .testCaseModalContents {
    height: auto;
    display: flex;
    flex-direction: column;

    margin-top: 1.5rem;
  }
  .testCaseRow {
    display: flex;
    flex-direction: row;
  }
  .testCaseCol {
    height: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .testCaseTitle {
    font-size: 1.2rem;
    text-align: center;
    font-family: "GmarketSansBold";
    border-bottom: 1px solid white;
    color: white;
  }
  .testCaseInput {
    width: 2.5vw;
    text-align: center;
    font-size: 1.2rem;
    font-family: "GmarketSansBold";
    border-bottom: 1px solid white;
    color: white;
    margin-bottom: 0.5rem;
  }

  .testCaseCol {
    height: 25%;
    display: flex;
    flex-direction: column;
  }
  .bottomSection {
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1rem;
    background-color: ${theme.adminContentBg};
    border-radius: 0.5rem;
  }
  .problemInputSection {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .sectionTitle {
    width: 9%;
    text-align: center;
    font-size: 1.3rem;
    font-family: "GmarketSansBold";
    color: white;
    border-bottom: 1px solid white;
    margin-bottom: 1rem;
  }
  .textareaBg {
    background-color: ${(props) =>
      props.testcasemodal === true ? `rgba(29,31,34,0.3)` : "#1e1f22"};
    padding: 1rem;

    textarea {
      width: 100%;
      height: auto;
      color: white;
      font-size: 1.1rem;
      font-family: "GmarketSansLight";
      border: 1px solid white;
      background-color: ${(props) =>
        props.testcasemodal === true ? `rgba(29,31,34,0.3)` : "#1e1f22"};
    }
  }

  .testCaseButtonContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  .testCaseButton {
    width: 7vw;
    height: 4vh;
    border-radius: 0.3rem;
    margin-right: 0.4rem;
    background-color: #565656;
    border: 1px solid #999999;

    &:hover {
      background-color: #999999;
    }
  }

  .sectionTitle2 {
    width: 9%;
    text-align: center;
    font-size: 1.3rem;
    font-family: "GmarketSansBold";
    color: white;
    border-bottom: 1px solid white;
    margin-bottom: 2rem;
  }
  .listElement {
    margin-bottom: 3rem;
  }
  .problemList {
    font-family: "GmarketSansMedium";
    margin-left: 0.5rem;
    color: white;
  }
`;
export const ManageProblemsContainer = styled.div<{ modalstate: boolean }>`
  height: 100vh;
  padding: 3rem 1rem 1rem 2rem;
  .container {
    width: 90%;
    border-bottom: 1px solid white;
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  .lists {
    width: 90%;
    display: flex;
    flex-direction: column;
    font-family: "GmarketSansMedium";
    color: white;
  }
  .listContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
    margin-bottom: 0.2rem;

    &:hover {
      background-color: ${theme.selectedGray};
      border-radius: 0.3rem;
    }
  }
  .type {
    background-color: ${theme.mainColor};
    border-radius: 0.3rem;
    padding-inline: 1rem;
    padding-block: 0.1rem;
    margin-right: 0.3rem;
    border: none;
    outline: none;
  }
  .slideModal {
    transition: width 0.5s ease-in-out;
    width: ${(props) => (props.modalstate === true ? "40%" : "3%")};
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background-color: ${theme.adminBg};
  }
  .slideModalContent {
    width: 90%;
    height: 100%;
    padding: 0.5rem;
    padding: 1rem 0 1rem 2rem;
  }
  .slideModalTitle {
    width: 100%;
    color: white;
    font-family: "GmarketSansBold";
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .slideModalNav {
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "GmarketSansBold";
    color: white;
    margin-bottom: 1.5rem;
  }

  .modalRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tag {
    background-color: ${theme.mainColor};
    padding-inline: 2rem;
    padding-block: 0.2rem;
    border-radius: 0.5rem;
  }
  .slideModalContents {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "GmarketSansLight";
    color: white;
  }
  .problem {
    font-family: "GmarketSansBold";
    color: white;
    border-bottom: 1px solid white;
    font-size: 1.2rem;
  }
`;

export const ProblemDetailInput = styled.input`
  width: 190px;
  height: 40px;
  border: 1px solid ${theme.adminInputBg};
  outline: none;
  background-color: ${theme.adminInputBg};
  color: white;
  font-family: "GmarketSansMedium";
  margin: 0.5rem;
  border-radius: 0.3rem;
  font-weight: 700;
  padding-left: 0.5rem;

  &:hover {
    color: ${theme.lightBlack};
    border: 1px solid ${theme.lightBlack};
    background-color: white;
  }
`;

export const LimitElementInput = styled.input<{ testcasemodal: boolean }>`
  width: 190px;
  height: 20px;
  background-color: ${(props) =>
    props.testcasemodal === true ? `rgba(64,66,73,0.3)` : theme.adminInputBg};
  font-family: "GmarketSansMedium";
  color: white;
  outline: none;
  border: 1px solid ${theme.adminInputBg};
`;
