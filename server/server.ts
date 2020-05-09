#!/usr/bin/env node

import path from "path";
import fs from "fs";
import express from "express";
import minimist from "minimist";

const parseOption = {
  boolean: ["help"],
  alias: { p: "port", h: "help" },
  default: { p: 3000 },
};

const parsed = minimist(process.argv.slice(2), parseOption);
console.log(parsed);

if (parsed.help) {
  console.log("Usage: fene [options] <file>");
  process.exit(0);
}
if (parsed["_"].length < 1) {
  console.log("Error: no file given");
  process.exit(1);
}

const port = parsed.port;
const filePath = path.resolve(parsed["_"][0]);
console.log(filePath);
const fileName = path.basename(filePath);

const app = express();
app.use(express.static("public"));
app.get("/api/test", (_, res) => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.send(JSON.stringify(content));
  } catch {
    res.send("File Not Found");
  }
});

app.listen(port, () =>
  console.log(`Editing ${fileName} at http://localhost:${port}`)
);
