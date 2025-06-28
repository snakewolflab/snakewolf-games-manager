import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

  :root {
    /* テーマ色 */
    --theme-bg-color: #262a2f;
    --theme-text-color: #fdfcfd;

    /* アクセント色 */
    --accent-red: #ff8c94;
    --accent-orange: #e67e22;
    --accent-blue: #3498bd;
    --accent-green: #2ecc71;
    --accent-yellow: #f1c40f;

    /* Disable色 */
    --disable-gray: #7f8c8d;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    background-color: var(--theme-bg-color);
    color: var(--theme-text-color);
    line-height: 1.6;
  }

  a {
    color: var(--accent-blue);
    text-decoration: none;
    &:hover {
      color: var(--accent-red);
    }
  }

  button {
    cursor: pointer;
    background-color: var(--accent-blue);
    color: var(--theme-text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-weight: 700;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--accent-red);
    }
    &:disabled {
      background-color: var(--disable-gray);
      cursor: not-allowed;
    }
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    background-color: #3e444c;
    color: var(--theme-text-color);
    border: 1px solid #5a626b;
    padding: 10px;
    border-radius: 5px;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    &:focus {
      outline: none;
      border-color: var(--accent-blue);
    }
  }
`;

export default GlobalStyles;