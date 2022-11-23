import { useState } from "react";
import Sketch from "../../src/index";
import "./App.css";

function App() {
  const [hex, setHex] = useState("#FFFFFF");

  return (
    <div className="App">
      <h1>Color Picker</h1>
      <Sketch
        style={{ marginLeft: 20 }}
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
  );
}

export default App;
