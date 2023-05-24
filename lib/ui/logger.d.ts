export declare const ERROR_PREFIX: string;
export declare const INFO_PREFIX: string;
export declare const WRAN_PREFIX: string;
export declare class Logger {
    static error(message: string, ...args: any[]): void;
    static info(message: string, ...args: any[]): void;
    static wran(message: string, ...args: any[]): void;
}
