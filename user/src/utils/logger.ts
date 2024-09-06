import winston from 'winston';
import {LoggerLevelTypes, ModuleName} from "../types/loggerLevelTypes";


class Logger {

    readonly loggerError = winston.createLogger({
        level: LoggerLevelTypes.Error,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message}) => {
                return `${timestamp} Logger ${ModuleName} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: 'combined.log'})
        ],
    });

    readonly loggerWarning = winston.createLogger({
        level: LoggerLevelTypes.Warning,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message}) => {
                return `${timestamp} Logger ${ModuleName} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: 'combined.log'})
        ],
    });

    readonly loggerInfo = winston.createLogger({
        level: LoggerLevelTypes.Information,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message}) => {
                return `${timestamp} Logger ${ModuleName} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: 'combined.log'})
        ],
    });

    readonly loggerDebug = winston.createLogger({
        level: LoggerLevelTypes.Debug,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message}) => {
                return `${timestamp} Logger ${ModuleName} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: 'combined.log'})
        ],
    });

    error(message: string) {
        this.loggerError.log(
            {
                level: LoggerLevelTypes.Error,
                message: message
            });
    }

    warning(message: string) {
        this.loggerWarning.log(
            {
                level: LoggerLevelTypes.Warning,
                message: message
            });
    }

    info(message: string) {
        this.loggerInfo.log(
            {
                level: LoggerLevelTypes.Information,
                message: message
            });
    }

    debug(message: string) {
        this.loggerDebug.log(
            {
                level: LoggerLevelTypes.Debug,
                message: message
            });
    }
}

const logger = new Logger()

export default logger