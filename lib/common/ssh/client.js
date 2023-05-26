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
exports.setupClient = void 0;
const Client = require("ssh2-sftp-client");
const logger_1 = require("../../ui/logger");
function setupClient(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client();
        return client
            .connect(options)
            .catch(() => null)
            .then(() => client)
            .catch(() => {
            logger_1.Logger.wran(`${options.host}链接失败`);
            return null;
        });
    });
}
exports.setupClient = setupClient;
