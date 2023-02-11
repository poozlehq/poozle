/** Copyright (c) 2023, Poozle, all rights reserved. **/

import express from "express";

import ExtensionClass from "../src/index";

const app = express();
app.use(express.json());
const port = 8002;

app.post("/schema", async (req, res) => {
  const className = new ExtensionClass();
  const schema = await className.getSchema(req.body);

  res.send(schema || {});
});

app.post("/get_auth_headers", (req, res) => {
  const className = new ExtensionClass();
  res.send(className.getAuthHeaders(req.body) || {});
});

app.post("/spec", (_req, res) => {
  const className = new ExtensionClass();
  res.send(className.getSpec() || {});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
