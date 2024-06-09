import styled from "styled-components";
import { theme } from "../common/ColorStyles";

export const CreateStudy = styled.div`
    font-family: "GmarketSansMedium";
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;

    .modal-content {
        background-color: ${theme.lightGray};
        color: white;
        width: 400px;
        height: 400px;
        margin-top: 100px;
        padding: 20px;
    }

    .modal-header {
        font-family: "GmarketSansBold";
        font-size: 1.3rem;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid ${theme.black};
    }

    .modal-body {
        padding-top: 20px;
    }

    
`;