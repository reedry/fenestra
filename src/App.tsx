import React, { useState } from "react";
import CSS from "csstype";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/gfm/gfm";
import "codemirror/lib/codemirror.css";
import remark from "remark";
const remarkReact = require("remark-react");

const processor = remark().use(remarkReact);

const App: React.FC = () => {
  const [val, setVal] = useState("");
  const options = {
    mode: "gfm",
    lineWrapping: true,
    lineNumbers: true,
    theme: "default",
  };
  const compileMd = (mkd: string) => {
    const file: any = processor.processSync(mkd);
    return file.result || file.content;
  };
  return (
    <>
      <h1>App</h1>
      <div style={{ display: "flex" }}>
        <div style={styles.editor}>
          <CodeMirror
            className="editor"
            value={val}
            options={options}
            onBeforeChange={(editor, data, value) => {
              setVal(value);
            }}
            onChange={(editor, data, value) => {}}
          />
        </div>
        <div style={styles.preview}>{compileMd(val)}</div>
      </div>
    </>
  );
};

const styles: { [name: string]: CSS.Properties } = {
  editor: {
    width: "50%",
  },
  preview: {
    width: "50%",
    backgroundColor: "#d0d0d0",
  },
};

export default App;
