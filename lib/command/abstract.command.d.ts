import { Command } from "commander";
import { AbstractAction } from "../action";
export declare abstract class AbstractCommand {
    protected action: AbstractAction;
    constructor(action: AbstractAction);
    protected check(): void;
    abstract load(program: Command): void;
}
