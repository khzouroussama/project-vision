// order to import: CSS, React, node, code, components, assets

// React
import React from "react";
import ReactDOM from "react-dom";
// code
import * as serviceWorker from "./serviceWorker";
// components
import App from "./App";
import GlobalStylesComponent from "./Components/GlobalStyles";

import tw from "twin.macro";
import { createGlobalStyle } from "styled-components";

const StylesBase = createGlobalStyle`
  .slider-thumb::-webkit-slider-thumb {
    ${tw`appearance-none w-6 h-6 rounded-full bg-blue-400 cursor-pointer hover:ring-4 ring-blue-100`} 
  } 

  .slider-thumb::-webkit-slider-thumb:hover {
     ${tw`bg-blue-500`};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStylesComponent />
    <StylesBase />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
