import path from "path";
import bunyan from "bunyan";
import config from "config";

export const logger = bunyan.createLogger({
  name: config.get("app.name"),
  streams: [
    { level: "error", path: path.join(__dirname, "../logs/error.log") },
    { level: "warn", path: path.join(__dirname, "../logs/warn.log") },
    { level: "info", path: path.join(__dirname, "../logs/info.log") },
    { level: "debug", stream: process.stdout }
  ]
});
