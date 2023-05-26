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
exports.uploadFile = void 0;
const glob = require("glob");
const path_1 = require("path");
const fs_1 = require("fs");
const logger_1 = require("../../ui/logger");
function upload(client, file, local, remote) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.fastPut(file, file.replace(local, remote));
            return file;
        }
        catch (error) {
            return null;
        }
    });
}
function uploadFile(client, local, remote, ignore = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const paths = glob.sync((0, path_1.join)(local, '**/*'), { ignore: ignore || [] });
        const files = paths.filter(f => (0, fs_1.statSync)(f).isFile());
        const dirs = paths.filter(f => (0, fs_1.statSync)(f).isDirectory());
        const status = yield Promise.all(dirs.map((d) => __awaiter(this, void 0, void 0, function* () {
            try {
                const str = yield client.mkdir(d.replace(local, remote), true);
                logger_1.Logger.info(`成功在服务器创建文件夹:${d.replace(local, remote)}`);
                return true;
            }
            catch (error) {
                logger_1.Logger.wran(`在服务器创建文件夹失败:${d.replace(local, remote)}`);
                return false;
            }
        }))).then((v) => v.every(i => !!i));
        if (!status) {
            logger_1.Logger.wran(`以下文件上传失败:\n${files.join('\n')}`);
            return false;
        }
        ;
        let index = 0;
        let percent = 0;
        let _paths = [];
        let size = files.length;
        for (const file of files) {
            const status = yield upload(client, file, local, remote);
            index++;
            percent = parseInt(((index / size) * 100));
            if (status) {
                logger_1.Logger.info(`[${index}/${size}, ${percent}%] upload remote: ${file}`);
            }
            else {
                logger_1.Logger.wran(`[${index}/${size}, ${percent}%] upload remote: ${file}`);
                _paths.push(file);
            }
        }
        logger_1.Logger.wran(`以下文件上传失败:\n${_paths.join('\n')}`);
        return !_paths.length;
    });
}
exports.uploadFile = uploadFile;
