"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const logger_1 = require("../ui/logger");
const download_command_1 = require("./download.command");
const action_1 = require("../action");
const upload_command_1 = require("./upload.command");
class CommandLoader {
    static load(program) {
        new download_command_1.DownloadCommand(new action_1.DownloadAction()).load(program);
        new upload_command_1.UploadCommand(new action_1.UploadAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            logger_1.Logger.error('未知命令: %s', program.args.join(' '));
            logger_1.Logger.info('有关可用命令的列表，请参见 --help.\n');
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
