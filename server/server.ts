#!/usr/bin/env node

import path from "path";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import minimist from "minimist";

const parseOption = {
  boolean: ["help", "nopreview"],
  alias: { p: "port", h: "help", n: "nopreview" },
  default: { p: 8000 },
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
const preview = !parsed.nopreview;
const filePath = path.resolve(parsed["_"][0]);
console.log(filePath);
const fileName = path.basename(filePath);

const app = express();
app.use(bodyParser.json());
const pubpath = path.join(__dirname, "../public");
console.log(pubpath);
app.use(express.static(pubpath));
app.get("/api/test", (_, res) => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.json({
      exist: true,
      content,
      preview,
    });
  } catch {
    res.json({ exist: false, preview });
  }
});
app.post("/api/save", (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
});

app.listen(port, () =>
  console.log(`Editing ${fileName} at http://localhost:${port}`)
);
