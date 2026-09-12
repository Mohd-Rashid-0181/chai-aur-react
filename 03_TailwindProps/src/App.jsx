import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Card from "./components/card";

function App() {
  const [count, setCount] = useState(0);

  let myObj = {
    username : 'hitesh',
    age : 21
  }
  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl">Tailwind Test</h1>

      <Card username="chai aur code"  btnText ="Click me"/>
      <Card username="hitesh" btnText="Visit me"/>
    </>
  );
}

export default App;
