/** Copyright (c) 2023, Poozle, all rights reserved. **/
import bodyParser from 'body-parser';
import express from 'express';
import { createLogger, transports, format } from 'winston';

import { extensionHandler } from './handler/extension';
import { workspaceHandler } from './handler/workspace';

const app = express();
app.use(bodyParser.json());
const port = 3000;

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

app.post('/workspace', workspaceHandler(logger));
app.post('/extension', extensionHandler(logger));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
