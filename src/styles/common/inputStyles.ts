import styled from "styled-components";
import { theme } from "./ColorStyles";

export const InputContainer = styled.input`
  width: 30vw;
  height: 6vh;
  padding-left: 0.5rem;
  border: 2px solid ${theme.inputBorderColor};
  font-family: "GmarketSansLight";
  outline: none;
  border-radius: 0.3rem 0.3rem 0 0;
  color: #efefef;

  &:focus {
    border: 2px solid ${theme.mainColor};
    border-radius: 0.3rem 0.3rem 0 0;
  }
`;
