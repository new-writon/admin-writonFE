import { createGlobalStyle } from "styled-components";

import FontPretendardBlack from "./fonts/Pretendard-Black.woff2";
import FontPretendardBold from "./fonts/Pretendard-Bold.woff2";
import FontPretendardExtraBold from "./fonts/Pretendard-ExtraBold.woff2";
import FontPretendardExtraLight from "./fonts/Pretendard-ExtraLight.woff2";
import FontPretendardLight from "./fonts/Pretendard-Light.woff2";
import FontPretendardMedium from "./fonts/Pretendard-Medium.woff2";
import FontPretendardRegular from "./fonts/Pretendard-Regular.woff2";
import FontPretendardSemiBold from "./fonts/Pretendard-SemiBold.woff2";
import FontPretendardThin from "./fonts/Pretendard-Thin.woff2";

const GlobalStyle = createGlobalStyle`
  /* =============== Global Style 설정 =============== */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
    font-size: 100%;
    vertical-align: baseline;
    position: relative;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  html {
    height:100%;
  }

  body {
    height: 100%;
    line-height: 1;
    background-color: #fff;
  }

  button {
    background: none;
    border: none;
    box-shadow: none;
    overflow: visible;
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }

  p {
    color: var(--Gray-100, #212121);
  }

  li, ol, ul {
    list-style: none;
  }

  input {
    border: none;
    outline: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* =============== Font 설정 =============== */
  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-style: normal;
    src: url('${FontPretendardThin}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-style: normal;
    src: url('${FontPretendardExtraLight}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-style: normal;
    src: url('${FontPretendardLight}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('${FontPretendardRegular}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('${FontPretendardMedium}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url('${FontPretendardSemiBold}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url('${FontPretendardBold}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-style: normal;
    src: url('${FontPretendardExtraBold}') format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-style: normal;
    src: url('${FontPretendardBlack}') format('woff2');
    font-display: block;
  }

  @font-face {
      font-family: 'Happiness-Sans-Bold';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
  }

  @font-face {
      font-family: 'Happiness-Sans-Regular';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
  }
`;

export default GlobalStyle;
