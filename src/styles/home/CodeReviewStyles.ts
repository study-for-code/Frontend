import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const Container = styled.div`
  flex: 1;

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
  .codeContainer {
    width: 90%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-family: monospace;
    color: white;
  }
  .codeLine {
    display: flex;
    flex-direction: row;
    margin: 0.3rem 0 0.3rem 0.5rem;
  }
  pre {
    display: flex;
    flex-direction: column;
    background-color: ${theme.gray};
    color: #abb2bf;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: monospace;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  .line-number {
    display: inline-block;
    text-align: right;
    margin-right: 1rem;
    color: #5c6370;
  }

  .chat_room {
    padding: 0.8rem;
    width: 90%;
    max-height: 200px;
    overflow-y: auto;
    background-color: ${theme.lightBlack};
    border-radius: 0.5rem;
  }
  .chat_room::-webkit-scrollbar {
    display: none;
  }
  .chat_messages {
    font-family: "GmarketSansLight";
    color: white;
  }
  .chat_message_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: "GmarketSansLight";
    color: white;

    img {
      border-radius: 50%;
      margin-right: 0.3rem;
    }
  }
  .user {
    font-size: 0.8rem;
  }
  .profile_container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .timestamp {
    font-size: 0.7rem;
    color: ${theme.CategoryFontColor};
  }
  .chat {
    position: sticky;
    bottom: 0;
    width: 95%;
    height: 20px;
    font-family: "GmarketSansLight";
    color: white;
    border-radius: 0.2rem;
    outline: none;
    border: none;
    background-color: ${theme.gray};
    padding-left: 0.5rem;

    &:focus {
      border: 1px solid ${theme.inputBorderColor};
      color: ${theme.inputBorderColor};
      background-color: white;
    }
  }
`;
