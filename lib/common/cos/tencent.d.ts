import * as COS from 'cos-nodejs-sdk-v5';
import { AbstractCos } from './abstract.cos';
export declare class TencentCos extends AbstractCos<COS> {
    protected id: string;
    protected key: string;
    protected region: string;
    protected bucket: string;
    constructor(id: string, key: string, region: string, bucket: string);
    protected getFiles(dir: string): Promise<string[]>;
    protected uploadRemoteFile(local: string, remote: string): Promise<boolean>;
    protected deleteRemoteFile(name: string): Promise<boolean>;
    protected dowloadRemoteFile(local: string, remote: string): Promise<boolean>;
}
