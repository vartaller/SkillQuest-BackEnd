"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const loggerLevelTypes_1 = require("../types/loggerLevelTypes");
class Logger {
    constructor() {
        this.loggerError = winston_1.default.createLogger({
            level: loggerLevelTypes_1.LoggerLevelTypes.Error,
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} Logger ${loggerLevelTypes_1.ModuleName} ${level}: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'combined.log' })
            ],
        });
        this.loggerWarning = winston_1.default.createLogger({
            level: loggerLevelTypes_1.LoggerLevelTypes.Warning,
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} Logger ${loggerLevelTypes_1.ModuleName} ${level}: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'combined.log' })
            ],
        });
        this.loggerInfo = winston_1.default.createLogger({
            level: loggerLevelTypes_1.LoggerLevelTypes.Information,
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} Logger ${loggerLevelTypes_1.ModuleName} ${level}: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'combined.log' })
            ],
        });
        this.loggerDebug = winston_1.default.createLogger({
            level: loggerLevelTypes_1.LoggerLevelTypes.Debug,
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} Logger ${loggerLevelTypes_1.ModuleName} ${level}: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'combined.log' })
            ],
        });
    }
    error(message) {
        this.loggerError.log({
            level: loggerLevelTypes_1.LoggerLevelTypes.Error,
            message: message
        });
    }
    warning(message) {
        this.loggerWarning.log({
            level: loggerLevelTypes_1.LoggerLevelTypes.Warning,
            message: message
        });
    }
    info(message) {
        this.loggerInfo.log({
            level: loggerLevelTypes_1.LoggerLevelTypes.Information,
            message: message
        });
    }
    debug(message) {
        this.loggerDebug.log({
            level: loggerLevelTypes_1.LoggerLevelTypes.Debug,
            message: message
        });
    }
}
const logger = new Logger();
exports.default = logger;
