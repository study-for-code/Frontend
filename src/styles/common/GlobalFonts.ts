import { createGlobalStyle } from "styled-components";
import GmarketSansBold from "@/font/GmarketSansTTFBold.ttf";
import GmarketSansMedium from "@/font/GmarketSansTTFMedium.ttf";
import GmarketSansLight from "@/font/GmarketSansTTFLight.ttf";

export const GlobalFonts = createGlobalStyle`
body {
padding: 0;
margin: 0;
}
@font-face {
      font-family: 'GmarketSansBold';
      src: local('GmarketSansBold'), local('GmarketSansBold');
      font-style: normal;
      src: url(${GmarketSansBold}) format('truetype');
}
@font-face {
      font-family: 'GmarketSansMedium';
      src: local('GmarketSansMedium'), local('GmarketSansMedium');
      font-style: normal;
      src: url(${GmarketSansMedium}) format('truetype');
}
@font-face {
      font-family: 'GmarketSansLight';
      src: local('GmarketSansLight'), local('GmarketSansLight');
      font-style: normal;
      src: url(${GmarketSansLight}) format('truetype');
}
`;
