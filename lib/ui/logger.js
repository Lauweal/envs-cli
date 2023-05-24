"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.WRAN_PREFIX = exports.INFO_PREFIX = exports.ERROR_PREFIX = void 0;
const colors = require("chalk");
exports.ERROR_PREFIX = colors.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)('ERROR');
exports.INFO_PREFIX = colors.bgRgb(35, 187, 110).bold.rgb(0, 0, 0)('INFO');
exports.WRAN_PREFIX = colors.bgRgb(208, 211, 44).bold.rgb(0, 0, 0)('WRAN');
class Logger {
    static error(message, ...args) {
        console.log(`\n${exports.ERROR_PREFIX} >>> ${colors.redBright(message)}`, ...args);
        process.exit(1);
    }
    static info(message, ...args) {
        console.log(`\n${exports.INFO_PREFIX} >>> ${colors.green(message)}`, ...args);
    }
    static wran(message, ...args) {
        console.log(`\n${exports.WRAN_PREFIX} >>> ${colors.yellow(message)}`, ...args);
    }
}
exports.Logger = Logger;
