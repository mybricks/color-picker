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
        onChange={(color) => {
          console.log("======= color =======\n", color);
          setHex(color.hexa);
        }}
      />
    </div>
  );
}

export default App;
