/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable, LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as winston from 'winston';
import { createLogger, LoggerOptions } from 'winston';

@Injectable()
export class MyLogger implements LoggerService {
  private readonly logger;

  private level = 'info';

  private context: string;

  private static LOGS_PATH = 'storage/logs';

  constructor() {
    this.logger = createLogger(this.getLoggerOptions(this.level));
    this.setContext('Main');
  }

  public getLoggerOptions(level: string): LoggerOptions {
    return {
      level,
      transports: [
        new winston.transports.File({
          filename: `${MyLogger.LOGS_PATH}/${level}.log`,
        }),
      ],
    };
  }
  public setContext(context: string): this {
    this.context = context;

    return this;
  }

  public setLevel(level: string): this {
    this.level = level;

    const loggerOptions = this.getLoggerOptions(level);
    this.overrideOptions(loggerOptions);

    return this;
  }

  log(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    this.logToConsole('info', message);
  }

  error(message: string, trace?: string): void {
    this.setLevel('error');
    const currentDate = new Date();
    // i think the trace should be JSON Stringified
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('error', message);
  }

  warn(message: string): void {
    this.setLevel('warn');
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('warn', message);
  }

  info(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('info', message);
  }

  debug(message: string): void {
    this.setLevel('debug');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('debug', message);
  }

  overrideOptions(options: LoggerOptions): void {
    this.logger.configure(options);
  }

  // this method just for printing a cool log in your terminal , using chalk
  private logToConsole(level: string, message: string): void {
    let result;
    const color = chalk;
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      default:
      case 'info':
        result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
    }
    console.log(result); // TODO: DON'T remove this console.log

    this.logger.close();
  }
}
