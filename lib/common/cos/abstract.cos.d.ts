export declare abstract class AbstractCos<C = any> {
    protected id: string;
    protected key: string;
    protected region: string;
    protected bucket: string;
    constructor(id: string, key: string, region: string, bucket: string);
    protected client: C;
    private isFile;
    private isDirectory;
    private filepath;
    private mkdir;
    protected abstract getFiles(dir: string): Promise<string[]>;
    private walk;
    private walkRemote;
    private collectLocalFiles;
    private collectRemoteFiles;
    private findDeletedFiles;
    protected abstract deleteRemoteFile(name: string): Promise<boolean>;
    protected abstract uploadRemoteFile(local: string, remote: string): Promise<boolean>;
    protected abstract dowloadRemoteFile(local: string, remote: string): Promise<boolean>;
    protected deleteLocalFile(name: string): void;
    private cleanRemoteFiles;
    private cleanLocalFiles;
    private uploadFiles;
    private dowloadFiles;
    upload(local: string, remote: string): Promise<boolean>;
    uploads(assets: {
        local: string;
        remote: string;
    }[]): Promise<boolean>;
    dowload(local: string, remote: string): Promise<boolean>;
    dowloads(assets: {
        local: string;
        remote: string;
    }[]): Promise<boolean>;
}
