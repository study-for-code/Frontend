import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const Container = styled.div`
  /* padding: 1rem; */
  height: 96vh;

  .title {
    border-bottom: 2px solid ${theme.lightBlack};
    font-family: "GmarketSansBold";
    color: ${theme.fontWhiteColor};
    padding: 1rem 0.5rem 1rem 1.5rem;
    font-size: 1.3rem;
  }

  .contentArea {
    padding: 1rem;
  }

  .inputArea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
  }

  .week-text {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #fff;
  }

  .solver {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 5px;
  }
`;
