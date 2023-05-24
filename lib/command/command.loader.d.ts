import { Command } from "commander";
export declare class CommandLoader {
    static load(program: Command): void;
    private static handleInvalidCommand;
}
