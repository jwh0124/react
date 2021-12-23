import "./App.css";
import ColorBox from "./components/ColorBox";
import SelectColors from "./components/SelectColors";
import { ColorProvier } from "./contexts/color";

function App() {
  return (
    <ColorProvier>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvier>
  );
}

export default App;
