"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.isYaml = void 0;
const path_1 = require("path");
const lodash_1 = require("lodash");
const joi = require("joi");
const IpSchema = joi.object().keys({
    host: joi.string().required(),
    port: joi.alternatives().try(joi.string(), joi.number()).required()
});
const AssetsSchema = joi.object().keys({
    type: joi.array().items(joi.string().valid('cos', 'ssh').default('ssh')).required(),
    local: joi.string().required(),
    remote: joi.string().required(),
});
const CosSchema = joi.object().keys({
    type: joi.string().valid('tencent', 'ali').default('tencent'),
    region: joi.string().required(),
    bucket: joi.string().required(),
});
const schema = joi.object({
    ssh: joi.array().ordered(IpSchema),
    cos: CosSchema,
    assets: joi.array().items(AssetsSchema).required()
});
function isYaml(file) {
    const name = (0, path_1.extname)(file);
    return ['.yaml', '.yml'].includes(name);
}
exports.isYaml = isYaml;
function check(config) {
    const { value, error } = schema.validate(config, {
        convert: false
    });
    const message = (0, lodash_1.get)(error, 'details.0.message');
    if (message)
        throw new Error(message);
    return value;
}
exports.check = check;
