import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/gfm/gfm";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";

const App: React.FC = () => {
  const [val, setVal] = useState("");
  const options = {
    mode: "gfm",
    lineWrapping: true,
    lineNumbers: true,
    theme: "solarized light",
  };
  return (
    <div style={{ width: "50%" }}>
      <h1>App</h1>
      <CodeMirror
        value={val}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setVal(value);
        }}
        onChange={(editor, data, value) => {}}
      />
    </div>
  );
};

export default App;
