import { extname } from "path";
import * as joi from 'joi';

const schema = joi.object({
    ssh: joi.array().required().message('ssh需为数组'),
})

export function isYaml(file: string) {
    const name = extname(file);
    return ['.yaml', '.yml'].includes(name);
}

