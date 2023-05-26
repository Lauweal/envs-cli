import { existsSync, readFileSync } from "fs";
import * as yaml from 'yaml';
import { Input } from "../command";
import { AbstractAction } from "./abstract.action";
import { check, isYaml } from "../utils/check-config";
import { Logger } from "../ui/logger";

export class UploadAction extends AbstractAction {


    public handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const ssh = options.find((o) => o.name === 'ssh')?.value;
        const cos = options.find((o) => o.name === 'cos')?.value;
        const config = options.find((o) => o.name === 'config')?.value as string;
        try {
            if(existsSync(config)) {
                if(!isYaml(config)) throw new Error('非yaml配置文件');
                const data = readFileSync(config).toString();
                const isAll = [ssh, cos].every(Boolean);
                const yamlData = yaml.parse(data);
                const value = check(yamlData);
                return;
            }
            Logger.error('配置文件不存在');
        } catch (error) {
            Logger.error(error.message);
        }
    }
}