import { ClientOption } from "./client";
interface Assets {
    local: string;
    remote: string;
}
export declare function sshUpload(assets: Assets[], option: ClientOption[], status?: boolean[]): Promise<boolean>;
export {};
