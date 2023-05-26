"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAction = void 0;
const fs_1 = require("fs");
const yaml = require("yaml");
const abstract_action_1 = require("./abstract.action");
const check_config_1 = require("../utils/check-config");
const logger_1 = require("../ui/logger");
class UploadAction extends abstract_action_1.AbstractAction {
    handle(inputs, options, extraFlags) {
        var _a, _b, _c;
        const ssh = (_a = options.find((o) => o.name === 'ssh')) === null || _a === void 0 ? void 0 : _a.value;
        const cos = (_b = options.find((o) => o.name === 'cos')) === null || _b === void 0 ? void 0 : _b.value;
        const config = (_c = options.find((o) => o.name === 'config')) === null || _c === void 0 ? void 0 : _c.value;
        try {
            if ((0, fs_1.existsSync)(config)) {
                if (!(0, check_config_1.isYaml)(config))
                    throw new Error('非yaml配置文件');
                const data = (0, fs_1.readFileSync)(config).toString();
                const isAll = [ssh, cos].every(Boolean);
                const yamlData = yaml.parse(data);
                const value = (0, check_config_1.check)(yamlData);
                return;
            }
            logger_1.Logger.error('配置文件不存在');
        }
        catch (error) {
            logger_1.Logger.error(error.message);
        }
    }
}
exports.UploadAction = UploadAction;
