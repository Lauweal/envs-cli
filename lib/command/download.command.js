"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadCommand = void 0;
const lodash_1 = require("lodash");
const abstract_command_1 = require("./abstract.command");
const path = require("path");
class DownloadCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('download')
            .description('下载资源文件')
            .option('-c, --config [config]', '配置文件', 'assets.yaml')
            .option('-id, --accessKeyId [accessKeyId]', 'accessKeyId')
            .option('-key, --accessKeySecret [accessKeySecret]', 'accessKeySecret')
            .option('-u, --username [username]', 'username')
            .option('-p, --password [password]', 'password')
            .action((command) => __awaiter(this, void 0, void 0, function* () {
            const config = (0, lodash_1.get)(command, 'config');
            const accessKeyId = (0, lodash_1.get)(command, 'accessKeyId');
            const accessKeySecret = (0, lodash_1.get)(command, 'accessKeySecret');
            const username = (0, lodash_1.get)(command, 'username');
            const password = (0, lodash_1.get)(command, 'password');
            const ssh = [username, password].every(Boolean);
            const cos = [accessKeyId, accessKeySecret].every(Boolean);
            const inputs = [];
            const options = [];
            options.push({
                name: 'ssh',
                value: ssh,
            });
            options.push({
                name: 'cos',
                value: cos,
            });
            options.push({
                name: 'config',
                value: path.join(process.cwd(), config),
            });
            options.push({
                name: 'username',
                value: username
            });
            options.push({
                name: 'password',
                value: password
            });
            options.push({
                name: 'accessKeyId',
                value: accessKeyId
            });
            options.push({
                name: 'accessKeySecret',
                value: accessKeySecret
            });
            yield this.action.handle(inputs, options);
        }));
    }
}
exports.DownloadCommand = DownloadCommand;
