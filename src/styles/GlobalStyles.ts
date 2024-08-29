import { createGlobalStyle } from "styled-components";
import '/src/styles/GlobalFonts.css';

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

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    transition: border-color 0.25s;
  }

  button:focus {
    outline: none;
  }

  button:disabled {
    cursor: default;
  }

  /* button:hover {
    border-color: #646cff;
  } */

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

  input::placeholder {
    color: #94989F; // Gray60
  }

  input:disabled {
    background-color: transparent;
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
    /* custom */
    font-weight: 500;
    color: #646cff;
  }

  a:hover {
    color: #535bf2;
  }
`;

export default GlobalStyle;
