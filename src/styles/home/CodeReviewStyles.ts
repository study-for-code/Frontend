import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const Container = styled.div`
  /* padding: 1rem; */

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

  .header {
    display: flex;
    flex-direction: row;
    background-color: ${theme.lightGray};
    justify-content: space-between;
    margin-right: 2rem;
  }
  .userRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .userColumn {
    display: flex;
    flex-direction: column;
  }
  .problemRow {
    width: 60%;
    display: flex;
    justify-content: space-around;
  }
  .data {
    color: ${theme.CategoryFontColor};
  }
  .unit {
    color: ${theme.mainRed};
    margin-left: 0.5rem;
  }
  .code {
    width: 90%;
    height: 100%;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${theme.gray};
  }
`;
