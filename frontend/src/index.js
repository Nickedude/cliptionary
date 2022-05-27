import React from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import Target from "./components/TargetText";
import Canvas from "./components/Canvas";
import Startup from "./components/Startup";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Startup />
      <Target />
      <Canvas user={"niklas"} />
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)