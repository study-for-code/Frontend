import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const Container = styled.div`
  height: 96vh;
  overflow: hidden;
  font-family: "GmarketSansMedium";
  display: flex; /* 부모 컨테이너에 플렉스 속성을 추가 */
  flex-direction: column;
  flex: 1;

  .title {
    border-bottom: 2px solid ${theme.lightBlack};
    font-family: "GmarketSansMedium";
    color: ${theme.fontWhiteColor};
    padding: 1rem 0.5rem 1rem 1.5rem;
    font-size: 1.3rem;
  }

  .problem-details {
    flex: 1;
    overflow-x: auto;
    overflow-y: auto;
    padding: 3rem;
    color: ${theme.white};
    box-sizing: border-box;
    min-width: 51rem;

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

  .infoTable {
    margin-top: 1rem;
    margin-bottom: 4rem;
    min-width: 43.75rem;
  }

  .information {
    display: flex;
    flex-direction: row; /* 항목들을 가로로 나열 */
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .info-header,
  .info-value {
    flex: 1;
    text-align: left;
    font-size: 1rem;
    box-sizing: border-box; /* 여백과 패딩을 포함한 크기 계산 */
  }

  .info-header {
    font-weight: bold;
  }

  .divider {
    border: none;
    height: 1px;
    background-color: ${theme.white};
    margin: 1rem 0;
  }

  .content {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 4rem;
  }

  .task {
    display: inline-block;
    font-size: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.white};
  }

  .shortDivider {
    border: none;
    width: 3rem;
    height: 1px;
    background-color: ${theme.white};
    margin: 1rem 0;
  }

  .description {
    margin-bottom: 1rem;
    word-wrap: break-word; /* 긴 단어가 자동으로 줄바꿈되도록 설정 */
    word-break: break-all; /* 단어가 잘려서라도 줄바꿈되도록 설정 */
    overflow-wrap: break-word;
  }

  .testcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .example {
    border: 1px solid ${theme.white};
    padding: 1rem;
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    word-wrap: break-word; /* 긴 단어가 자동으로 줄바꿈 되도록 설정 */
    word-break: break-all; /* 단어를 자르면서 줄바꿈 되도록 설정 */
  }

  .togoIDE {
    cursor: pointer;
    position: fixed;
    bottom: 3rem;
    right: 5rem;

    width: 10rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    border-radius: 10px;
    opacity: 0.9;
    background-color: ${theme.black};

    &:hover {
      transition: 0.3s transform;
      background-color: ${theme.fontWhiteColor};
      color: ${theme.black};
      transform: scale(1.05);
    }
  }
`;
