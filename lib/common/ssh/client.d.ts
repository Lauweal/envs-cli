import * as Client from 'ssh2-sftp-client';
export interface ClientOption extends Client.ConnectOptions {
}
export declare function setupClient(options: Client.ConnectOptions): Promise<any>;
