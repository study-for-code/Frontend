import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const AlgorithmListContainer = styled.div`
  /* padding: 1rem; */
  flex: 1;

  .title {
    width: 96%;
    border-bottom: 2px solid ${theme.lightBlack};
    font-family: "GmarketSansBold";
    color: ${theme.fontWhiteColor};
    padding: 1rem 0.5rem 1rem 1.5rem;
    font-size: 1.3rem;
  }

  .contentArea {
    width: 90%;
    padding: 1rem;
  }

  .inputArea {
    width: 100%;
    margin-bottom: 1rem;
  }
  .input {
    width: 100%;
    height: 50px;
    padding-left: 0.5rem;
    font-family: "GmarketSansBold";
    border-radius: 0.5rem;
    border: none;
    outline: none;
    background-color: #3a3a3a;
    &:focus {
      background-color: white;
      border: 1px solid #3a3a3a;
    }
  }

  .week_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .week_text {
    font-size: 1.2rem;
    font-family: "GmarketSansBold";
    color: white;
    margin-bottom: 10px;
  }
  .remoteProblemHeader {
    width: 20%;
    display: flex;
    justify-content: space-between;
    font-family: "GmarketSansMedium";
  }
  .alreadySolve {
    display: flex;
    align-items: center;
    color: #c4c4c4;
    padding: 0.3rem;
    &:hover {
      background-color: white;
      border: 1px solid #666666;
      border-radius: 0.5rem;
      color: #3a3a3a;
    }
  }
  .addProblems {
    display: flex;
    align-items: center;
    color: #c4c4c4;
    padding: 0.3rem;
    &:hover {
      background-color: ${theme.CategoryFontColor};
      border: 1px solid #666666;
      border-radius: 0.5rem;
    }
  }
`;
