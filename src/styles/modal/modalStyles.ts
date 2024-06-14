import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const ModalContainer = styled.div`
  font-family: "GmarketSansMedium";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background-color: ${theme.lightGray};
    color: white;
    width: 400px;
    height: auto;
    margin-bottom: 50px;
    padding: 20px;
    border-radius: 10px;
  }

  .modal-header {
    font-family: "GmarketSansMedium";
    font-size: 1.3rem;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${theme.black};
  }

  .modal-body {
    padding: 10px 0px;
  }

  .text-input-area {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .text-input-area > label {
    margin-right: 20px;
  }

  .text-input-area > input {
    font-family: "GmarketSansMedium";
    font-size: 1rem;
    height: 20px;
    padding: 5px;
    background-color: ${theme.lightGray};
    color: ${theme.mainYellow};
    border: 2px solid ${theme.lightBlack};
    border-radius: 5px;
  }

  .text-input-area > input:focus {
    outline: none;
    color: ${theme.lightGray};
    background-color: #fff;
  }

  .image-input-area {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 90px;
  }

  .image-input-area > div {
    margin-right: 50px;
  }

  .real-input {
    display: none;
  }

  .fake-input {
    cursor: pointer;
    background-color: ${theme.lightBlack};
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    margin-right: 40px;
  }

  .image-preview-container {
    width: 80px;
    height: 80px;
    border: 5px solid ${theme.lightBlack};
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .btn-area {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .btn-area > button {
    font-family: "GmarketSansMedium";
    background-color: ${theme.btnWhite};
    border: 1px solid ${theme.btnGray};
    border-radius: 10px;
    color: ${theme.btnGray};
    padding: 5px 10px;
    margin: 0px 5px;
    &:hover {
      transition: 0.3s transform;
      background-color: ${theme.btnGray};
      color: ${theme.btnWhite};
      transform: scale(1.05);
    }
  }
`;
