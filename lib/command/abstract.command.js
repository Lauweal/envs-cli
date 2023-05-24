"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCommand = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../ui/logger");
const localBinPathSegments = [process.cwd(), 'node_modules', '.bin', 'envs-cli'];
class AbstractCommand {
    constructor(action) {
        this.action = action;
    }
    check() {
        const cmdFilePath = (0, path_1.join)(...localBinPathSegments);
        if (!(0, fs_1.existsSync)(cmdFilePath)) {
            logger_1.Logger.error('当前工程下缺少cli依赖,请执行下面的命令:\nnpm install envs-cli -D');
        }
    }
}
exports.AbstractCommand = AbstractCommand;
