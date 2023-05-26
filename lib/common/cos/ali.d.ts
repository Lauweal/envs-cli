import { AbstractCos } from "./abstract.cos";
export declare class AliCos extends AbstractCos {
    protected id: string;
    protected key: string;
    protected region: string;
    protected bucket: string;
    constructor(id: string, key: string, region: string, bucket: string);
    protected getFiles(dir: string): Promise<string[]>;
    protected deleteRemoteFile(name: string): Promise<boolean>;
    protected uploadRemoteFile(local: string, remote: string): Promise<boolean>;
    protected dowloadRemoteFile(local: string, remote: string): Promise<boolean>;
}
