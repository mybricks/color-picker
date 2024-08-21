import { useState } from "react";
import Sketch from "../../src/index";
import "./App.css";

function App() {
  const [hex, setHex] = useState("transparent");

  return (
    <div className="App">
      <h1 style={{ backgroundColor: hex }}>Color Picker</h1>
      <Sketch
        style={{ marginLeft: 20 }}
        color={hex}
        onChange={(color, oldColor) => {
          console.log("======= color =======\n", color, oldColor);
          setHex(color.hex);
        }}
      />
    </div>
  );
}

export default App;
