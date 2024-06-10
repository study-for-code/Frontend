import { keyframes } from "styled-components";

export const showDrawer = keyframes`
  0% {
    transform: translateX(-100px);
  }
  100%{
    transform: translateX(0px);
  }
`;

export const hideDrawer = keyframes`
  0% {
    transform: translateX(0px);
  }
  100%{
    transform: translateX(-100px);
  }
`;

export const moveSideBar = keyframes`
  
  0% {
    transform: translateX(0px);
  }
  100%{
    transform: translateX(100px);
  }
`;

export const backSideBar = keyframes`
  0% {
    transform: translateX(100px);
  }
  100%{
    transform: translateX(0px);
  }
`;

export const moveContent = keyframes`
  0% {
    transform: translateX(0);
  }
  100%{
    transform: translateX(200px);
  }
`;

export const backContent = keyframes`
  

  0% {
    transform: translateX(200px);
  }
  100%{
    transform: translateX(0px);
  }
`;
