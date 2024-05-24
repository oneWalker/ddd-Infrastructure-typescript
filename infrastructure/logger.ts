// a general simple logger information include server name
import Logger from "logger_nodejs-lib";

const LOGGING_LEVEL = process.env.LOGGING_LEVEL;
const LOGGING_FILE_PATH = process.env.LOGGING_FILE_PATH;
const SERVICE_NAME = process.env.SERVICE_NAME;
const LOGGING_STRINGIFY = process.env.LOGGING_STRINGIFY;

export const logger = new Logger(
  SERVICE_NAME,
  LOGGING_LEVEL,
  LOGGING_FILE_PATH,
  LOGGING_STRINGIFY === "true"
);
