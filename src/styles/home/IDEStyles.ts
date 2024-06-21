import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const Container = styled.div`
  height: 96vh;
  overflow: hidden;
  font-family: "GmarketSansMedium";
  display: flex;
  flex-direction: column;
  flex: 1;

  /* 스크롤바 스타일링 */
  .problem-details,
  .codeSpace,
  .result {
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.gray};
      border-radius: 10px;
      margin: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.lightBlack};
      border-radius: 10px;
      border: 4px solid ${theme.lightBlack};
      background-clip: padding-box;
    }
  }

  .title {
    border-bottom: 2px solid ${theme.lightBlack};
    font-family: "GmarketSansMedium";
    color: ${theme.fontWhiteColor};
    padding: 0.5rem;
    margin-bottom: 0;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
  }

  .toggle-button-container {
    display: inline-flex;
    align-items: center;
    background-color: ${theme.CategoryFontColor};
    border-radius: 12px;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
    position: relative;
    font-size: 0.8rem;
  }

  .label {
    color: white;
    margin-right: 8px;
  }

  .arrow {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition: transform 0.2s;
  }

  .arrow.open {
    transform: rotate(-135deg);
  }

  .arrow.closed {
    transform: rotate(45deg);
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #4a4a4a;
    border-radius: 0 0 12px 12px;
    padding: 5px 0;
    margin-top: 5px;
    z-index: 1000;
  }

  .dropdown-menu.open {
    display: block;
  }

  .dropdown-item {
    padding: 5px 10px;
    color: white;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #6a6a6a;
  }

  .divideContainer {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 0.5rem;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .problem-details,
  .IDEContainer {
    flex: 1;
    overflow-x: auto;
    overflow-y: auto;
  }

  .problem-details {
    padding: 0 2rem 1rem 1rem;
    padding-right: 2rem;
    color: ${theme.white};
    box-sizing: border-box;
    /* min-width: 51rem; */
  }

  .IDEContainer {
    display: flex;
    height: 100%;
    flex-direction: column;
    border-left: 2px solid ${theme.lightBlack};
    overflow: hidden;
  }

  .content {
    font-size: 0.8rem;
    line-height: 1.5rem;
    margin-bottom: 2rem;
  }

  .task {
    display: inline-block;
    font-size: 1.2rem;
  }

  .content > ul {
    margin: 0;
    padding-left: 1rem;
  }

  .content li {
    margin-bottom: 0.5rem;
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
    font-size: 0.8rem;
    line-height: 1.5rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .example > pre {
    word-wrap: break-word;
    word-break: break-all;
  }

  .codeSpace {
    overflow: auto;
    height: 30rem;
    border-bottom: 2px solid ${theme.lightBlack};
    color: ${theme.fontWhiteColor};
    font-family: "GmarketSansLight";
  }

  .editor {
    flex: 1;
    min-height: 25rem;
    display: flex;
    gap: 0.625rem;
    font-family: monospace;
    line-height: 1.3rem;
    background-color: ${theme.gray};
    border-radius: 0.625rem;
    padding: 1.25rem 0.625rem;
    margin: 0.5rem;
  }

  .lineNumbers {
    width: 1.5rem;
    text-align: right;
    counter-reset: linenumber;
    /* padding: 0.5em; */
  }

  .lineNumber {
    font-size: 0.8rem;
    counter-increment: linenumber;
    display: block;

    /* &::before {
      content: counter(linenumber);
      display: block;
    } */
  }

  .fakeDiv {
    flex: 1;
    background: ${theme.gray};
    position: relative;
  }

  textarea,
  .present {
    font-size: 0.8rem;
    line-height: 1.3rem;
    position: absolute;
    margin: 0;
    width: 100%; /* 패딩을 고려하여 100%로 설정 */
    top: 0;
    left: 0;
  }

  textarea {
    flex: 1;
    overflow-y: hidden;
    border: 0;
    outline: none;
    resize: none;
    font-family: monospace;
    color: transparent;
    background-color: transparent;
    caret-color: ${theme.white}; /* 커서 색상 명시 */
    z-index: 1; /* z-index 조정 */
    padding: 0;
    overflow: hidden; /* 추가된 스타일 */
    height: 1.3rem;
  }

  .present {
    background-color: ${theme.gray};
    z-index: 0; /* z-index 조정 */
    border-radius: 0.25rem;
    text-overflow: ellipsis;
    line-height: 1.3rem;
    overflow: hidden; /* present 내에서 overflow 숨기기 */
  }

  .present code {
    display: block;
    white-space: pre-wrap; /* 긴 줄이 자동으로 줄 바꿈되도록 설정 */
    word-wrap: break-word; /* 단어가 넘칠 경우 줄 바꿈 */
    overflow: hidden; /* code 내에서 overflow 숨기기 */
  }

  .resultSpace {
    display: flex;
    flex-direction: column;
    color: ${theme.white};
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    overflow: hidden;
  }

  .resultSpace > .task {
    padding: 0.5rem;
    border-bottom: 2px solid ${theme.lightBlack};
  }

  .result {
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
    height: 15rem;
  }

  .elements {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2rem;
  }

  .element {
    padding: 0.5rem 0rem;
    font-size: 1.2rem;
  }

  .testResult {
    display: flex;
    border: 1px solid ${theme.white};
    padding: 0.5rem;
    margin: 0.5rem;
    align-items: center;
    gap: 0.5rem;
  }

  .small {
    font-size: 0.8rem;
    float: right;
  }

  .pass {
    color: ${theme.mainColor};
  }

  .fail {
    color: ${theme.mainYellow};
  }

  .error {
    color: ${theme.wrongMent};
  }

  .footer {
    display: flex;
    height: 3rem;
    border-top: 2px solid ${theme.lightBlack};
    justify-content: flex-end;
    align-items: center;
  }

  .submit {
    font-family: "GmarketSansMedium";
    font-size: 1rem;
    margin-right: 0.5rem;
    padding: 0.5rem 0.8rem;
    border: none;
    border-radius: 10px;
    background: ${theme.gray};
    color: ${theme.fontWhiteColor};

    &:hover {
      background-color: ${theme.fontWhiteColor};
      color: ${theme.gray};
      transition: 0.3s transform;
      transform: scale(1.05);
    }
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
