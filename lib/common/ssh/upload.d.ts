import * as Client from 'ssh2-sftp-client';
export declare function uploadFile(client: Client, local: string, remote: string, ignore?: string[]): Promise<boolean>;
