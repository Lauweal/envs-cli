import { extname } from "path";
import { get } from 'lodash';
import * as joi from 'joi';

const IpSchema = joi.object().keys({
    host: joi.string().required(),
    port: joi.alternatives().try(joi.string(), joi.number()).required()
});

const AssetsSchema = joi.object().keys({
    type: joi.array().items(joi.string().valid('cos', 'ssh')).required(),
    local: joi.string().required(),
    remote: joi.string().required(),
})

const CosSchema = joi.object().keys({
    region: joi.string(),
    bucket: joi.string(),
})

const schema = joi.object({
    ssh: joi.array().ordered(IpSchema).required(),
    cos: CosSchema,
    assets: joi.array().ordered(AssetsSchema).required()
})

export function isYaml(file: string) {
    const name = extname(file);
    return ['.yaml', '.yml'].includes(name);
}

export function check(config) {
    const { value, error } = schema.validate(config, {
        convert: false
    });
    const message = get(error, 'details.0.message')
    if(message) throw new Error(message);
    return value;
}
