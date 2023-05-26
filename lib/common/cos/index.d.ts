import { AbstractCos } from "./abstract.cos";
export declare enum CosType {
    Tencent = 0,
    Ali = 1
}
export declare class COS {
    static create(type: CosType, options: {
        id: string;
        key: string;
        region: string;
        bucket: string;
    }): AbstractCos;
}
