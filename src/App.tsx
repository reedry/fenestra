import React, { useEffect, useState } from "react";
import CSS from "csstype";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/gfm/gfm";
import "codemirror/lib/codemirror.css";
import remark from "remark";
const remarkReact = require("remark-react");
import marked from "marked";

const processor = remark().use(remarkReact);

const App: React.FC = () => {
  const [val, setVal] = useState("");
  const [isEnabledPreview, setIsEnabledPreview] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();
  const options = {
    mode: "gfm",
    lineWrapping: true,
    lineNumbers: true,
    theme: "default",
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await window.fetch("/api/test");
      const data = await res.json();
      console.log(data);
      if (data.preview) {
        setIsEnabledPreview(true);
      }
      setVal(data.content);
    };
    fetch();
    console.log(`preview: ${isEnabledPreview}`);
  }, []);
  useEffect(() => {
    window.clearTimeout(timeoutId);
    setTimeoutId(
      window.setTimeout(() => {
        console.log("invoked");
      }, 2000)
    );
  }, [val]);
  const compileMd = (mkd: string) => {
    const file: any = processor.processSync(mkd);
    return file.result || file.contents;
  };
  const marked2react = (mkd: string) => {
    const tokens = marked.lexer(mkd);
    return <>{JSON.stringify(tokens, null, 2)}</>;
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
        {isEnabledPreview && (
          <>
            <div style={styles.preview}>{compileMd(val)}</div>
            <div style={styles.preview}>{marked2react(val)}</div>
          </>
        )}
      </div>
    </>
  );
};

const styles: { [name: string]: CSS.Properties } = {
  editor: {
    width: "100%",
  },
  preview: {
    width: "50%",
    backgroundColor: "#d0d0d0",
    border: "1px solid #000",
  },
};

export default App;
