import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
      background: ${colors.primaryDarkColor};
      color: ${colors.primaryDarkColor};
    }

    html, body, #root {
      height: 100%;
    }

    button {
      cursor: pointer;
      background: ${colors.primaryColor};
      border: none;
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 700;
      transition: all 0.3s;

      &:hover {
        filter: brightness(70%);
      }
    }

    a {
      text-decoration: none;
      color: ${colors.primaryColor};
    }

    ul {
      list-style: none;
    }
    .Toastify__toast--success {
      background: ${colors.sucessColor};
      color: white;
    }
    .Toastify__progress-bar--success {
      background: #fff;
    }

    .Toastify__toast--error {
      background: ${colors.errorColor};
      color: white;
    }
    .Toastify__progress-bar--error {
      background: #fff;
    }

    .Toastify__close-button {
      color: #fff;
    }

`;

export const Container = styled.section`
  max-width: 600px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
