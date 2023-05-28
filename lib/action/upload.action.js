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
exports.UploadAction = void 0;
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const yaml = require("yaml");
const abstract_action_1 = require("./abstract.action");
const check_config_1 = require("../utils/check-config");
const logger_1 = require("../ui/logger");
const cos_1 = require("../common/cos");
const ssh_1 = require("../common/ssh");
class UploadAction extends abstract_action_1.AbstractAction {
    handle(inputs, options, extraFlags) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const ssh = (_a = options.find((o) => o.name === 'ssh')) === null || _a === void 0 ? void 0 : _a.value;
            const cos = (_b = options.find((o) => o.name === 'cos')) === null || _b === void 0 ? void 0 : _b.value;
            const config = (_c = options.find((o) => o.name === 'config')) === null || _c === void 0 ? void 0 : _c.value;
            const username = (_d = options.find((o) => o.name === 'username')) === null || _d === void 0 ? void 0 : _d.value;
            const password = (_e = options.find((o) => o.name === 'password')) === null || _e === void 0 ? void 0 : _e.value;
            const accessKeyId = (_f = options.find((o) => o.name === 'accessKeyId')) === null || _f === void 0 ? void 0 : _f.value;
            const accessKeySecret = (_g = options.find((o) => o.name === 'accessKeySecret')) === null || _g === void 0 ? void 0 : _g.value;
            try {
                if ((0, fs_1.existsSync)(config)) {
                    if (!(0, check_config_1.isYaml)(config))
                        throw new Error('非yaml配置文件');
                    const data = (0, fs_1.readFileSync)(config).toString();
                    const isAll = [ssh, cos].every(s => !!s);
                    const yamlData = yaml.parse(data);
                    const value = (0, check_config_1.check)(yamlData);
                    const sshData = (0, lodash_1.get)(value, 'ssh', []);
                    const cosData = (0, lodash_1.get)(value, 'cos');
                    const assets = (0, lodash_1.get)(value, 'assets', []);
                    const cosAssets = assets.filter(i => i.type.includes('cos')).map((i) => (Object.assign(Object.assign({}, i), { local: (0, path_1.join)(process.cwd(), i.local) })));
                    const sshAssets = assets.filter(i => i.type.includes('ssh')).map((i) => (Object.assign(Object.assign({}, i), { local: (0, path_1.join)(process.cwd(), i.local) })));
                    if (!sshData.length && !Object.keys(cosData).length)
                        throw new Error('请输入上传的ssh配置或cos配置');
                    if (!assets.length)
                        throw new Error('请输入资源信息');
                    if (isAll) {
                        const sshOptions = sshData.map(s => (Object.assign(Object.assign({}, s), { port: Number(s.port), username,
                            password })));
                        const cos = cos_1.COS.create(cosData.type == 'tencent' ? cos_1.CosType.Tencent : cos_1.CosType.Ali, {
                            id: accessKeyId,
                            key: accessKeySecret,
                            region: cosData.region,
                            bucket: cosData.bucket,
                        });
                        const cosStatus = yield cos.uploads(cosAssets);
                        const sshStatus = yield (0, ssh_1.sshUpload)(sshAssets, sshOptions);
                        if ([cosStatus, sshStatus].includes(false))
                            throw new Error('文件更新失败');
                        return;
                    }
                    if (ssh) {
                        const sshOptions = sshData.map(s => (Object.assign(Object.assign({}, s), { port: Number(s.port), username,
                            password })));
                        const sshStatus = yield (0, ssh_1.sshUpload)(sshAssets, sshOptions);
                        if ([sshStatus].includes(false))
                            throw new Error('文件更新失败');
                        return;
                    }
                    if (cos) {
                        const cos = cos_1.COS.create(cosData.type == 'tencent' ? cos_1.CosType.Tencent : cos_1.CosType.Ali, {
                            id: accessKeyId,
                            key: accessKeySecret,
                            region: cosData.region,
                            bucket: cosData.bucket,
                        });
                        const cosStatus = yield cos.uploads(cosAssets);
                        if ([cosStatus].includes(false))
                            throw new Error('文件更新失败');
                        return;
                    }
                    return;
                }
                logger_1.Logger.error('配置文件不存在');
            }
            catch (error) {
                logger_1.Logger.error(error.message);
            }
        });
    }
}
exports.UploadAction = UploadAction;
