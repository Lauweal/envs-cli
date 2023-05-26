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
exports.sshUpload = void 0;
const logger_1 = require("../../ui/logger");
const client_1 = require("./client");
const upload_1 = require("./upload");
function sshUpload(assets, option, status = []) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!option.length)
            return status.every((s) => !!s);
        const client = option.shift();
        const ssh = yield (0, client_1.setupClient)(client);
        if (!ssh)
            return sshUpload(assets, option, [...status, false]);
        logger_1.Logger.info(`开始上传资源到${client.host}`);
        let statu;
        try {
            statu = yield Promise.all(assets.map((item) => (0, upload_1.uploadFile)(ssh, item.local, item.remote))).then((val) => val.every(i => !!i));
            logger_1.Logger.info(`资源上传到${client.host}成功`);
        }
        catch (error) {
            statu = false;
            logger_1.Logger.wran(`资源上传到${client.host}失败`);
        }
        ssh.end();
        return sshUpload(assets, option, [...status, statu]);
    });
}
exports.sshUpload = sshUpload;
